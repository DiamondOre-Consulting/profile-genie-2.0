import { Router } from "express";
import { register, login, logout, profile, handleSocialLogin, forgotPassword, refreshAccessAndRefreshToken, resetPassword } from "../controller/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import passport from "../passport/passport.js";

const router = Router()

router.post('/register', upload.single('avatar'), register)

router.post('/login', login)

router.get('/logout', verifyJWT, logout)

router.post('/forgot-password', forgotPassword)

router.post('/reset-password/:token', resetPassword)

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

const handleSocialLoginFailure = (req, res) => {
    const referer = req.headers.referer || "";
    const isAdminDomain = referer.includes("master.profilegenie.in");
    const isCatalogueDomain = referer.includes("catalogue.profilegenie.in");

    let redirectUrl = "https://profilegenie.in/login?error=Email is not registered!";

    console.log(isAdminDomain, isCatalogueDomain, referer)

    if (isAdminDomain) {
        redirectUrl = "https://master.profilegenie.in/login?error=Email is not registered!";
    } else if (isCatalogueDomain) {
        redirectUrl = "https://catalogue.profilegenie.in/login?error=Email is not registered!";
    }

    return res.redirect(redirectUrl);
};


router.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google", (err, user, info) => {
            if (err || !user) {
                return handleSocialLoginFailure(req, res);
            }
            req.user = user;
            next();
        })(req, res, next);
    },
    handleSocialLogin
);


export default router