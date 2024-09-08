const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const laptopRoutes = require("./routes/laptopRoutes");
const Laptop = require("./models/Laptop");
const cors = require("cors");
const gsmarena = require("gsmarena-api");

const getLaptops = require("./controllers/laptopController");

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.get("/all", async (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const laptops = await Laptop.find({ title: new RegExp(query, 'i') })
                                .skip(skip)
                                .limit(limit);
    const total = await Laptop.countDocuments({ title: new RegExp(query, 'i') });
    res.json({ laptops, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const devices = await gsmarena.search.search(query);
    res.json(devices);
  } catch (error) {
    console.error("Error searching for phones:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for phones" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/auth", authRoutes);

// Export the app for Vercel
app.listen(5000, () => console.log(`Server running on port ${5000}`));
module.exports = app;
