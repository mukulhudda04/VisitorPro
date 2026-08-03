const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    getDashboardStats
} = require("../controllers/dashboardController");

// Dashboard Statistics
router.get("/", verifyToken, getDashboardStats);

module.exports = router;