// Google OAuth Strategy Configuration
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await prisma.user.upsert({
        where: { googleId: profile.id },
        update: {},
        create: {
          googleId: profile.id,
          username: profile.displayName || profile.name.givenName,
          name: profile.name.givenName + " " + profile.name.familyName,
          email: profile.emails?.[0]?.value || null,
          profilePicture: profile.photos?.[0]?.value || null,
        },
      });
      done(null, user);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
