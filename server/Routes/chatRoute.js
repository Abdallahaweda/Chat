let express = require("express");
const {
  createChat,
  findUserChats,
  findChat,
} = require("../Controllers/chatController");

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:seconedId", findChat);

module.exports = router;
