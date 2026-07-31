const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(null, uniqueName + path.extname(file.originalname));
    }
});

// File Filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png/i;

    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    if (extname) {
        return cb(null, true);
    }

    return cb(new Error("Only JPG, JPEG and PNG files are allowed."));
};

// Upload Middleware
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});

module.exports = upload;