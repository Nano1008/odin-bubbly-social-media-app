const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();

router.get("/", requireAuth /* listAllUsers */);
router.get("/:id", requireAuth /* getUserProfile */);
router.post("follow/:id", requireAuth /* followUser */);

module.exports = router;
