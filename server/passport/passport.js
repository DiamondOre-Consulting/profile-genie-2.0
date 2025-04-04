import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User from "../model/auth.model.js"
import { config } from "dotenv";
import AppError from "../utils/error.utils.js";
config()

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'https://profile-genie-2-0.onrender.com/api/v1/auth/google/callback',
        },
        async (_, __, profile, done) => {
            try {
                const existingUser = await User.findOne({ $or: [{ googleId: profile?.id }, { email: profile.emails[0].value }] });

                const emailUser = await User.findOne({ email: profile.emails[0].value })

                if (!emailUser) {
                    return done(null, null)
                }

                if (existingUser) {
                    if (!existingUser.googleId) {
                        existingUser.googleId = profile.id
                        existingUser.isVerified = true

                        if (!existingUser?.avatar?.url) {
                            existingUser.avatar = {
                                url: profile.photos[0].value,
                                publicId: ""
                            }
                        }

                        await existingUser.save()
                    }

                    return done(null, existingUser)
                }

                const user = await User.create({
                    googleId: profile.id,
                    fullName: profile.displayName,
                    isVerified: true,
                    password: profile.id,
                    email: profile.emails[0].value,
                    loginType: "google",
                    avatar: {
                        url: profile.photos[0].value,
                        publicId: ""
                    }
                })

                console.log("hello", user)

                return done(null, user)
            } catch (err) {
                done(err, null)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

export default passport;