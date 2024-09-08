const mongoose = require("mongoose");
const laptopSchema = new mongoose.Schema({
  title: String,
  image_url: String,
  detail: String,
});
const Laptop = mongoose.model("Laptop", laptopSchema);

module.exports = Laptop;
