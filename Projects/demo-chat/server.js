const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const PORT = 5000;

app.get("/", (req, res) => res.send("hello!"));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("message-broadcast", msg)
});

http.listen(PORT, () => {
  console.log(`This server is listening on port ${PORT}`);
});
