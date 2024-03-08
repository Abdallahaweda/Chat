let chatModel = require("../Models/chatModel");

//Create Chat
let createChat = async (req, res) => {
  let { firstId, seconedId } = req.body;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, seconedId] },
    });

    if (chat) return res.status(200).json(chat);

    let newChat = new chatModel({
      members: [firstId, seconedId],
    });

    let response = await newChat.save();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//Find User Chat
let findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//Find Chat
let findChat = async (req, res) => {
  const { firstId, seconedId } = req.params;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, seconedId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createChat, findUserChats, findChat };
