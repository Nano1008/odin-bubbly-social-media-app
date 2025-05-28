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
    failureRedirect: "/",
    successRedirect: "/api",
  })
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
    return res.json(req.user);
  }
  return res.status(401).json({ message: "Unauthorized" });
});

module.exports = router;
