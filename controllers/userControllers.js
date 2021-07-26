// dependency imports
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// model imports
const User = require("../models/User");

// validator imports
const { validator } = require("../validators");

exports.userSignup = async (req, res) => {
  try {
    const { email, password, password2 } = req.body;

    if (!email || !password || !password2) {
      return res.status(400).json({ msg: "please complete all fields" });
    }

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(400).json({ msg: "invalid credentials" });
    }
    if (password !== password2) {
      return res.status(400).json({ msg: "passwords don't match" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: passwordHash });

    const savedUser = await newUser.save();

    const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET);

    res.cookie("token", token, { httpOnly: true }).send();
  } catch (err) {
    return res.status(500).json({ err: err });
  }
};

exports.userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    const token = jwt.sign({ user: checkUser._id }, process.env.JWT_SECRET);

    res.cookie("token", token, { httpOnly: true }).send();
  } catch (err) {
    return res.status(500).json({ err: err });
  }
};

exports.userSignout = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) }).send();
};

exports.isLogged = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(200).json(false);

    jwt.verify(token, process.env.JWT_secret);

    res.send(true);
  } catch (err) {
    return res.status(200).json(false);
  }
};
