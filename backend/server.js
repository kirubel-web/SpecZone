// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const gsmarena = require("gsmarena-api");

dotenv.config();

const app = express();
app.use(cors(
	{
		origin: [http://localhost:3000/],
		methods: ["GET", "POST"],
		credentials: true,

	}

));
app.use(express.json());
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
