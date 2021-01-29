var express = require("express");
var router = express.Router();
const userSignup = require("../controllers/user.signup");
const userSignin = require("../controllers/user.signin");
const { tokenVerification } = require("../middlewares/auth.middleware");

router.post("/signup", userSignup.signup);
router.post("/auth/signin", userSignin.signin);

module.exports = router;
