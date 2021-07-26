const router = require("express").Router();

// controller imports
const {
  addCustomer,
  allCustomers,
} = require("../controllers/customerControllers");
// middleware imports
const { isAuth } = require("../middleware");

router.post("/add", isAuth, addCustomer);
router.get("/all", isAuth, allCustomers);

module.exports = router;
