const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    visitorValidationRules,
    validate
} = require("../validators/visitorValidator");

const {
    getVisitors,
    createVisitor,
    updateVisitor,
    deleteVisitor
} = require("../controllers/visitorController");

// ==========================
// Protected Routes
// ==========================

// Get All Visitors
router.get("/", verifyToken, getVisitors);

// Create Visitor with Photo Upload
router.post(
    "/",
    verifyToken,
    upload.single("photo"),
    visitorValidationRules,
    validate,
    createVisitor
);

// Update Visitor
router.put(
    "/:id",
    verifyToken,
    upload.single("photo"),
    visitorValidationRules,
    validate,
    updateVisitor
);

// Delete Visitor
router.delete(
    "/:id",
    verifyToken,
    deleteVisitor
);

module.exports = router;