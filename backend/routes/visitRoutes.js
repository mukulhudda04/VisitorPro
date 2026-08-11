const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminMiddleware");

const {
    checkInVisitor,
    checkOutVisitor,
    getActiveVisits,
    getVisitHistory,
    deleteVisitHistory,
    deleteMultipleVisitHistory
} = require("../controllers/visitController");

// ==========================
// PROTECTED ROUTES
// ==========================

router.post(
    "/checkin",
    verifyToken,
    checkInVisitor
);

router.put(
    "/checkout/:id",
    verifyToken,
    checkOutVisitor
);

router.get(
    "/active",
    verifyToken,
    getActiveVisits
);

router.get(
    "/history",
    verifyToken,
    getVisitHistory
);

// ==========================
// ADMIN ONLY - DELETE
// ==========================

// Delete single history entry
router.delete(
    "/history/:id",
    verifyToken,
    requireAdmin,
    deleteVisitHistory
);

// Delete multiple history entries
router.delete(
    "/history",
    verifyToken,
    requireAdmin,
    deleteMultipleVisitHistory
);

module.exports = router;