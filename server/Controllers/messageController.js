let messageModel = require("../Models/messageModel");

//createMessage
let createMessage = async (req, res) => {
  let { chatId, senderId, text } = req.body;

  let message = new messageModel({
    chatId,
    senderId,
    text,
  });

  try {
    const response = await message.save();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//getMessages
let getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    let messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessages };
