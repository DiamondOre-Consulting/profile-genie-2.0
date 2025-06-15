import AppError from "../utils/error.utils.js";
import sendMail from "../utils/mail.utils.js";
import User from "../model/auth.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const accessTokenOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  // domain: "test.webakash1806.com"
};

const refreshTokenOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  // domain: "test.webakash1806.com"
};

const generateAuthTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = await refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, role = "SUPERADMIN" } = req.body;

  const uniqueUser = await User.findOne({ email });
  if (uniqueUser) {
    throw new AppError("User already exists", 400);
  }

  const user = await User.create({ fullName, email, password, role });

  const { accessToken, refreshToken } = await generateAuthTokens(user._id);

  user.refreshToken = await refreshToken;
  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -resetPasswordToken -resetPasswordExpiry"
  );

  if (!createdUser) {
    throw new AppError("Something went wrong in registering!", 400);
  }
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .json({
      success: true,
      user: createdUser,
      message: "User registered successfully!",
    });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Email is not registered!", 400);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Password is wrong!", 400);
  }

  const { accessToken, refreshToken } = await generateAuthTokens(user._id);

  const fetchedUser = await User.findById(user._id).select(
    "-refreshToken -resetPasswordToken -resetPasswordExpiry"
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .json({
      success: true,
      user: fetchedUser,
      message: "User logged in successfully!",
    });
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: "" },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", accessTokenOptions)
    .clearCookie("refreshToken", refreshTokenOptions)
    .json({ success: true, message: "User logged out successfully!" });
});

const profile = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

const handleSocialLogin = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await generateAuthTokens(req.user._id);

  let redirectUrl = "https://profilegenie.in";
  if (req.user.role === "SUPERADMIN") {
    redirectUrl = process.env.ADMIN_URL;
  } else if (req.user.role === "CATALOGUE_OWNER") {
    redirectUrl = process.env.CATALOGUE_ADMIN_URL;
  }

  res
    .status(200)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .send(
      `<script>window.location.href="${redirectUrl}?success=true";</script>`
    );
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found!", 400);
  }

  let redirectUrl = "https://profilegenie.in";

  if (user.role === "SUPERADMIN") {
    redirectUrl = process.env.ADMIN_URL;
  } else if (user.role === "CATALOGUE_OWNER") {
    redirectUrl = process.env.CATALOGUE_ADMIN_URL;
  }

  const resetToken = await user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const { resetPasswordExpiry } = user;
  const expiryTime = encodeURIComponent(resetPasswordExpiry);
  const link = `${redirectUrl}/reset-password/${resetToken}/${email}/${expiryTime}`;
  await sendMail(email, "Reset Password", link, "Reset Password");

  return res
    .status(200)
    .json({
      success: true,
      message: "Reset password link has been sent to your email",
    });
});

const refreshAccessAndRefreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new AppError("You are not logged in!", 401);
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.JWT_REFRESH_SECRET
  );

  const user = await User.findById(decodedToken?.id).select(
    "-emailVerificationToken -emailVerificationExpiry"
  );

  if (!user) {
    throw new AppError("Invalid Token!", 401);
  }

  if (user.refreshToken !== incomingRefreshToken) {
    throw new AppError("Invalid Token!", 401);
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAuthTokens(user?._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", newRefreshToken, refreshTokenOptions)
    .json({
      accessToken,
      refreshToken: newRefreshToken,
    });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  let { password: newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: "Please provide a new password" });
  }

  const forgetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const existingUser = await User.findOne({
    resetPasswordToken: forgetPasswordToken,
    resetPasswordExpiry: { $gt: Date.now() },
  }).select("+password");

  if (!existingUser) {
    return res.status(400).json({ message: "Invalid or expired time limit" });
  }

  existingUser.password = newPassword;
  existingUser.resetPasswordToken = undefined;
  existingUser.resetPasswordExpiry = undefined;
  await existingUser.save();

  res
    .status(200)
    .json({ message: "Password updated successfully!", success: true });
});

export {
  register,
  login,
  logout,
  profile,
  handleSocialLogin,
  forgotPassword,
  refreshAccessAndRefreshToken,
  resetPassword,
};
