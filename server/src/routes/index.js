const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/api/posts", require("./posts"));
router.use("/api/users", require("./users"));

module.exports = router;
