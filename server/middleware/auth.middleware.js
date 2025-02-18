import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/error.utils.js";
import jwt from 'jsonwebtoken'
import User from "../models/auth.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req?.cookies?.token || req?.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new AppError("You are not logged in!", 401)
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decodedToken?.id).select("-password")
        console.log(user)
        if (!user) {
            throw new AppError("Invalid Token!", 401)
        }

        req.user = user

        next()
    }
    catch (err) {
        throw new AppError(err.message, 500)
    }
})

export { verifyJWT }