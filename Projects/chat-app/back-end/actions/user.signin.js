const User = require("../models/user.model");
const jwtToken = require("../services/jwt.service");
const { getAndAddUser } = require("../actions/users.chat");
const { generateToken } = require("../services/jwt.service");

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "The user does not exist" });
    }

    const isMatched = user.authenticatePassword(password);

    if (user.email !== email || !isMatched) {
      return res.status(401).send({
        message: "email or password is incorrect!",
      });
    }
    const token = generateToken(user);
    //   res.status(200).send({ token });
    // }
    getAndAddUser(user); //
    return res.status(202).send({
      token: token,
      user: user,
      message: "User is authenticated",
    });
  } catch (error) {
    return res.send({
      message: error.message,
    });
  }
};

module.exports = {
  signin,
};
