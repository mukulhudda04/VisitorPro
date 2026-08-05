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
    createUser,
    updateUser,
    deleteUser
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

// Update User
router.put(
    "/:id",
    verifyToken,
    authorizeRoles(1),
    updateUser
);

// Delete User
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles(1),
    deleteUser
);

module.exports = router;