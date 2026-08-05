const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getRoles
} = require("../controllers/roleController");

// ==========================
// Get All Roles
// ==========================
router.get(
    "/",
    verifyToken,
    authorizeRoles(1),
    getRoles
);

module.exports = router;