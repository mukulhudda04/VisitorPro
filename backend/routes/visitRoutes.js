const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    checkInVisitor,
    checkOutVisitor,
    getActiveVisits,
    getVisitHistory
} = require("../controllers/visitController");

// Protected Routes
router.post("/checkin", verifyToken, checkInVisitor);

router.put("/checkout/:id", verifyToken, checkOutVisitor);

router.get("/active", verifyToken, getActiveVisits);

router.get("/history", verifyToken, getVisitHistory);

module.exports = router;