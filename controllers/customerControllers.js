// model imports
const Customer = require("../models/Customer");

exports.addCustomer = async (req, res) => {
  try {
    const { name } = req.body;

    const newCustomer = new Customer({
      name,
    });

    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  } catch (err) {
    return res.status(500).json({ err: err });
  }
};

exports.allCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    res.status(200).json(customers);
  } catch (err) {
    return res.status(500).json({ err: err });
  }
};
