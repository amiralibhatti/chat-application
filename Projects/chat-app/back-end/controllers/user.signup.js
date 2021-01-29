const User = require("../models/user.model");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await new User();
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();
    return res.status(200).send({
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
