require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Test the GitHub authentication strategy
// router.get("/", (req, res) =>
//   res.send('<a href="/auth/github">Login with GitHub</a>')
// );

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
    failureRedirect: `${process.env.FRONTEND_URL}/`,
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/feed`);
  }
);

// Google OAuth route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/`,
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/feed`);
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

// Test Github authentication strategy
// router.get("/profile", (req, res) => {
//   console.log("Session user:", req.user);
//   if (!req.isAuthenticated()) return res.redirect("/auth");
//   res.send(
//     `<h1>Hello, ${req.user.username}</h1><pre>${JSON.stringify(
//       req.user,
//       null,
//       2
//     )}</pre>`
//   );
// });

module.exports = router;
