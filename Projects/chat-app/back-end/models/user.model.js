const Bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true, set: hashPassword },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);

function hashPassword(password) {
  const hashedPassword = Bcrypt.hashSync(password, 10);
  return hashedPassword;
}
userSchema.methods.authenticatePassword = function (userPassword) {
  const isMatched = Bcrypt.compareSync(userPassword, this.password);
  return isMatched;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
