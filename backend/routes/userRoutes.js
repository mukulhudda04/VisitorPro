const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    userValidationRules,
    validate
} = require("../validators/userValidator");

const {
    getUsers,
    createUser
} = require("../controllers/userController");

// ==========================
// Admin Only Routes
// ==========================

// Get All Users
router.get(
    "/",
    verifyToken,
    authorizeRoles(1),
    getUsers
);

// Create User
router.post(
    "/",
    verifyToken,
    authorizeRoles(1),
    userValidationRules,
    validate,
    createUser
);

module.exports = router;