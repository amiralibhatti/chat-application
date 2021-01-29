var createError = require("http-errors");
var express = require("express");
const http = require("http");
const socketio = require("socket.io");
var path = require("path");
const moment = require("moment");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");
const userHasEntered = require("./actions/users.chat");

const app = express();
const server = http.createServer(app);
// const io = socketio(server);
// io.origins("*:*");
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
const PORT = 4563;
const indexRouter = require("./routes/index");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

io.on("connection", (socket) => {
  console.log("New WebSocket connection!");

  socket.emit("message", "Welcome to chat!");

  socket.on("message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("message", msg);
  });

  socket.on("disconnect", () => {
    // const user = removeUser(socket.id);
    // if (user) {
    //   io.to(user.room).emit(
    //     "message",
    //     generateMessage(`${user.username} has left!`)
    //   );
    //   io.to(user.room).emit("roomData", {
    //     room: user.room,
    //     users: getUsersInRoom(user.room),
    //   });
    // }
    // socket.emit("message", "A user has left!"); for demo purpose
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

server.listen(PORT, () => {
  console.log(`This server is listening on port ${PORT}`);
});

mongoose
  .connect(process.env.connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Conncted!");
  })
  .catch((error) => {
    console.log("Error!", error);
  });
module.exports = app;
