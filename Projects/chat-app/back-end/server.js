// // const appJS = require("./app");
// // const path = require("path");
// const http = require("http");
// const express = require("express");
// // const cors = require("cors");
// const socketio = require("socket.io");

// const app = express();
// const server = http.createServer(appJS);
// const io = socketio(server);
// const port = 4563;

// app.use(cors());

// io.on("connection", (socket) => {
//   console.log("New WebSocket connection!");

//   socket.emit("message", "Welcome to chat!");

//   socket.on("message", (msg) => {
//     console.log(msg);
//     socket.broadcast.emit("message", msg);
//   });
// });

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
