const mongoose = require("mongoose");
const fs = require("fs");
const Laptop = require("./models/Laptop");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));
console.log(Laptop);

// Function to import data from JSON to MongoDB
const importData = async () => {
  try {
    // Read and parse the JSON file
    const laptops = JSON.parse(
      fs.readFileSync(
        "/home/k/Documents/web-scraping/laptop-spec/all_laptops.json",
        "utf-8",
      ),
    );
    console.log(laptops);
    // Insert the parsed JSON data into the Laptop collection
    await Laptop.insertMany(laptops);

    console.log("Data successfully imported!");
    process.exit(); // Exit the process after import
  } catch (err) {
    console.error("Error importing data:", err);
    process.exit(1); // Exit with failure
  }
};

// Run the import function
importData();
