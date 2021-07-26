// dependency imports
const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ msg: "unauthorised" });

    const verified = jwt.verify(token, process.env.JWT_secret);

    req.user = verified.user;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "unauthorised" });
  }
};
