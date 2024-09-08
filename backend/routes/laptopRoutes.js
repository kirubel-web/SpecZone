const express = require("express");
const { getLaptops } = require("../controllers/laptopController");

const router = express.Router();
router.get("/all", getLaptops);
