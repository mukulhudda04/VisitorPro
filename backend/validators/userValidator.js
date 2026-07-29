const { body, validationResult } = require("express-validator");

const userValidationRules = [
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full Name is required."),

    body("email")
        .isEmail()
        .withMessage("Valid Email is required."),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long."),

    body("phone")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone number must be exactly 10 digits.")
        .isNumeric()
        .withMessage("Phone number must contain only digits."),

    body("roleId")
        .isInt({ min: 1 })
        .withMessage("Valid Role Id is required."),

    body("departmentId")
        .isInt({ min: 1 })
        .withMessage("Valid Department Id is required.")
];

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array()
        });

    }

    next();
};

module.exports = {
    userValidationRules,
    validate
};