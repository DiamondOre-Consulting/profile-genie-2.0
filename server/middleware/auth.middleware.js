import AppError from "../utils/error.utils.js";
import jwt from 'jsonwebtoken'
import User from "../model/auth.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req?.cookies?.accessToken || req?.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
        throw new AppError("You are not logged in!", 401)
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        const user = await User.findById(decodedToken?.id).select("-refreshToken -emailVerificationToken -emailVerificationExpiry")
        if (!user) {
            throw new AppError("Invalid Access Token!", 401)
        }

        req.user = user

        next()
    }
    catch (err) {
        throw new AppError("Invalid Access Token!", 401)
    }
})

export { verifyJWT }