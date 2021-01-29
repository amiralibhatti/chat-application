const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const tokenVerification = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, config.SECRET_KEY, (err, user) => {
    if (err) {
      res.err = true;
      next();
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

module.exports = {
  tokenVerification,
};
