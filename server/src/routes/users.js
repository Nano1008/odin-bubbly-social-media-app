const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", requireAuth, userController.getAllUsers);
router.get("/:id", requireAuth /* getUserProfile */);
router.post("follow/:id", requireAuth /* followUser */);

module.exports = router;
