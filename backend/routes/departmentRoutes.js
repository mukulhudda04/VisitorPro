const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getDepartments
} = require("../controllers/departmentController");

// ==========================
// Get All Departments
// ==========================
router.get(
    "/",
    verifyToken,
    authorizeRoles(1),
    getDepartments
);

module.exports = router;