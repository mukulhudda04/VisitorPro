const { body, validationResult } = require("express-validator");

const visitorValidationRules = [
  body("FullName")
    .trim()
    .notEmpty()
    .withMessage("Full Name is required"),

  body("Phone")
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone must be exactly 10 digits"),

  body("Email")
    .trim()
    .isEmail()
    .withMessage("Valid Email is required"),

  body("CompanyName")
    .trim()
    .notEmpty()
    .withMessage("Company Name is required"),

  body("IDProofType")
    .trim()
    .notEmpty()
    .withMessage("ID Proof Type is required"),

  body("IDProofNumber")
    .trim()
    .notEmpty()
    .withMessage("ID Proof Number is required"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  visitorValidationRules,
  validate,
};