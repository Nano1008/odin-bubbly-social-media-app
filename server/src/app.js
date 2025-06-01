require("dotenv").config();
require("./middlewares/github");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const app = express();

app.use(
  cors({
    origin: ["https://bubbly-lovat.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Mock authentication for development
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    if (!req.user) {
      req.user = {
        id: "cmb6u32yj0004s81ubb2efgxn",
      };
      
    }
    next();
  });
}

// Routes
app.use(require("./routes/index"));

module.exports = app;
