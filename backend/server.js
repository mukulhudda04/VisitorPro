const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const visitRoutes = require("./routes/visitRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Load Environment Variables
dotenv.config();

const app = express();

// ==========================
// Database Connection
// ==========================
connectDB();

// ==========================
// Middleware
// ==========================
app.use(express.json());
app.use(cors());
app.use(helmet());

// Static Folder for Uploaded Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==========================
// API Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/visits", visitRoutes);

// ==========================
// Default Route
// ==========================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 VisitorPro Backend is Running..."
    });
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});