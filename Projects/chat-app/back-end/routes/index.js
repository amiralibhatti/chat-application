var express = require("express");
var router = express.Router();
const userRouter = require("./users.route");

//register
router.use("", userRouter);

module.exports = router;
