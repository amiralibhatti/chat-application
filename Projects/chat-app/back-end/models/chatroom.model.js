const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, required: true },
});

const Chatroom = mongoose.model("Chatroom", chatRoomSchema);

module.exports = Chatroom;
