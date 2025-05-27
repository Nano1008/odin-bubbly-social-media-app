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
    successRedirect: "/",
  })
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    res.redirect("/");
  });
});

module.exports = router;
