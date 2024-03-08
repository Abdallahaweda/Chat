const mongoose = require("mongoose");

let messageSchema = mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

let Message = mongoose.model("Message", messageSchema);

module.exports = Message;
