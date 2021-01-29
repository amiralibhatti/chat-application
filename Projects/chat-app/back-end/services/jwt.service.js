const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email, username: user.username },
    config.SECRET_KEY,
    {
      expiresIn: config.EXPIRE_TIME,
    }
  );
  return token;
};

const verifyToken = (token) => {
  if (!token) {
    return;
  }

  const decodedToken = jwt.verify(token, config.SECRET_KEY, (error, token) => {
    if (error) return error;

    return token;
  });

  return decodedToken;
};
module.exports = {
  generateToken,
  verifyToken,
};
