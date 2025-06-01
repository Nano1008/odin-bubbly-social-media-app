const express = require("express");
const { session } = require("passport");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/api/posts", require("./posts"));
router.use("/api/users", require("./users"));

// Session route
router.get("/session", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  req.session.user = "test";
  if (req.session) {
    return res.json({
      sessionId: req.session.id,
      sessionCookie: req.session.cookie,
    });
  }
  return res.status(404).json({ error: "Session not found" });
});

module.exports = router;
