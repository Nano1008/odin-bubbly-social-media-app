require("dotenv").config();
require("./middlewares/github");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
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
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require("./routes/index"));

module.exports = app;
