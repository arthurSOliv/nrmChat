const mongoose = require('mongoose');
const User = mongoose.model("User");
const sha256 = require('js-sha256');
const jwt = require('jwt-then');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if(password.length < 6) throw "Password must be atleast 6 characters.";

  const checkUser = await User.findOne({
    username,
  });

  if(checkUser) throw "Username already exists.";

  const user = new User({
    username,
    password: sha256(password + process.env.SALT),
  });

  await user.save();

  res.json({
    message: "User " + username + " registered successfully",
  })

};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
    password: sha256(password + process.env.SALT),
  });

  if(!user) throw "Username and Password did not match";

  const token = await jwt.sign({ id: user.id }, process.env.SECRET);

  res.json({
    message: "User logged succesfully.",
    token,
  })
};
