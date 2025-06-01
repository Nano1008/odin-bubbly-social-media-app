require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Login route
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

// Callback route
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${process.env.FRONDEND_URL}/signin`,
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}`);
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    res.json({ message: "Logged out successfully" });
  });
});

// Get current user route
router.get("/current_user", (req, res) => {
  if (req.user) {
    const currentUser = req.user;
    return res.json({ currentUser });
  }
  return res
    .status(401)
    .json({ APIAuthCurrent_user: "Request user not exist" });
});

// Check if user is logged in
router.get("/is_authenticated", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ isAuthenticated: true });
  }
  return res.json({ isAuthenticated: false });
});

module.exports = router;
