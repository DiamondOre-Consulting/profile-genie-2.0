import { Router } from "express";
import { register, login, logout, profile, handleSocialLogin, forgotPassword, refreshAccessAndRefreshToken } from "../controller/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import passport from "../passport/passport.js";

const router = Router()

router.post('/register', upload.single('avatar'), register)

router.post('/login', login)

router.get('/logout', verifyJWT, logout)

router.post('/forgot-password', forgotPassword)

router.get('/profile', verifyJWT, profile)

router.get('/refresh-token', refreshAccessAndRefreshToken)


router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }),
    (req, res, next) => {
        res.send('Redirecting to google login!')
    }
)

router.get('/google/callback',
    passport.authenticate('google',
        { failureRedirect: 'http://localhost:5174/login?error=Email is not registered!' }), handleSocialLogin,
)



export default router