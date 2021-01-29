var express = require("express");
var router = express.Router();
const userSignup = require("../actions/user.signup");
const userSignin = require("../actions/user.signin");
const { tokenVerification } = require("../middlewares/auth.middleware");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("../actions/users.chat");

router.post("/signup", userSignup.signup);
router.post("/signin", userSignin.signin);
// router.post("/addUser", addUser);
// router.post("/removeUser", removeUser);
// router.get("/getUser", getUser);
// router.get("/getUsersInRoom", getUsersInRoom);

module.exports = router;
