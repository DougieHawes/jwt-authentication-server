const router = require("express").Router();

// controller imports
const {
  userSignup,
  userSignin,
  userSignout,
  isLogged,
} = require("../controllers/userControllers");

router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.get("/signout", userSignout);
router.get("/islogged", isLogged);

module.exports = router;
