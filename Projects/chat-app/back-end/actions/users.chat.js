// const users = [];
const ChatRoom = require("../models/chatroom.model");

const getAndAddUser = (signedUser) => {
  const addUser = new ChatRoom();
  addUser.username = signedUser.username;
  addUser.email = signedUser.email;
  addUser.save(function (err) {
    if (err) return err;
  });
  userHasEntered(addUser.username);
};

const userHasEntered = (user) => {
  const username = ChatRoom.findOne({ username: user });
  console.log(username);
  return {
    name: username,
  };
};
// const removeUser = (id) => {
//   const index = users.findIndex((user) => {
//     return user.id === id;
//   });
//   if (index !== -1) {
//     return users.splice(index, 1)[0];
//   }
// };

// const getUsersInRoom = (room) => {
//   return users.filter((user) => user.room === room);
// };

module.exports = {
  // addUser,
  // removeUser,
  userHasEntered,
  getAndAddUser,
  // getUsersInRoom,
};
