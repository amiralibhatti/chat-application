const User = require("../models/user.model");
const { generateToken } = require("../services/jwt.service");

// const { use } = require("../../routes");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await new User();
    user.username = username;
    user.email = email;
    user.password = password;

    await user.save();
    const token = generateToken(user);
    return res.status(200).send({
      token: token,
      user: user,
      message: "User created!",
    });
  } catch (error) {
    return res.send({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
};
