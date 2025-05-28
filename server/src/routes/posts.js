const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();

router.post("/", requireAuth /* createPost */);
router.get("/feed", requireAuth /* getFeed */);
router.post("/:id/like", requireAuth /* likePost */);
router.post("/:id/comment", requireAuth /* commentPost */);

module.exports = router;
