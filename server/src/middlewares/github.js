// Github OAuth Strategy Configuration using Passport.js
require("dotenv").config();
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await prisma.user.upsert({
        where: { githubId: profile.id },
        update: {},
        create: {
          githubId: profile.id,
          username: profile.username,
          name: profile.displayName || profile.username,
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
