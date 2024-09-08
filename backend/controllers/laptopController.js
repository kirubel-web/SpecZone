const Laptop = require("../models/Laptop");

exports.getLaptops = async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.json(laptops);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
