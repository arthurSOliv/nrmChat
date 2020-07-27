const mongoose = require('mongoose');
const Chatroom = mongoose.model("Chatroom");

exports.create = async (req, res) => {
  const { name } = req.body;

  const chatroomExist = await Chatroom.findOne({ name });

  if(chatroomExist) throw "Chatroom already exists."

  const chatroom = new Chatroom({
    name,
  });

  await chatroom.save();

  res.json({
    message: "Chatroom created.",
  })
};

exports.getAll = async (req, res) => {
  const chats = await Chatroom.find({});

  res.json(chats);
}
