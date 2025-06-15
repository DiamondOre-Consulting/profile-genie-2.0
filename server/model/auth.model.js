import { Schema, model } from "mongoose";
import AppError from "../utils/error.utils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    facebookId: {
      type: String,
      unique: true,
      sparse: true,
    },
    loginType: {
      type: String,
      enum: ["email", "google", "facebook"],
      default: "email",
    },
    avatar: {
      publicId: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["USER", "CATALOGUE_OWNER", "SUPERADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
});

userSchema.methods = {
  comparePassword: async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (err) {
      return false;
    }
  },
  generateRefreshToken: function () {
    return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
  },
  generateAccessToken: function () {
    return jwt.sign({ id: this._id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
  },
  generatePasswordResetToken: async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpiry = Date.now() + 5 * 60 * 1000;

    return resetToken;
  },
};

export default model("User", userSchema);
