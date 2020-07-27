const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Chatroom name is required.'
  },
});

module.exports = mongoose.model("Chatroom", chatroomSchema);
