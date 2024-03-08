const mongoose = require("mongoose");

let chatScema = mongoose.Schema(
  {
    members: Array,
  },
  {
    timestamps: true,
  }
);

let Chat = mongoose.model("Chat", chatScema);
module.exports = Chat;
