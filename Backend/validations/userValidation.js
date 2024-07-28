const { body, validationResult } = require("express-validator");

const rules = [
  body("firstName")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ max: 30 })
    .withMessage("First name cannot be more than 30 characters")
    .notEmpty()
    .withMessage("First name is required"),
  body("lastName")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ max: 30 })
    .withMessage("Last name cannot be more than 30 characters")
    .notEmpty()
    .withMessage("Last name is required"),
  body("email")
    .isEmail()
    .withMessage("Email must be valid")
    .notEmpty()
    .withMessage("Email is required"),
  body("mobile")
    .isNumeric()
    .withMessage("Mobile number must be numeric")
    .notEmpty()
    .withMessage("Mobile number is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("Password must be strong")
    .isLength({ min: 8 })
    .withMessage("Password cannot be less than 8 characters"),
  body("currentCompany")
    .optional()
    .isString()
    .withMessage("Current company must be a string")
    .isLength({ max: 50 })
    .withMessage("Current company name cannot be more than 50 characters"),
  body("role")
    .isIn(["EMPLOYEE", "EMPLOYER"])
    .withMessage("Role must be either EMPLOYEE or EMPLOYER")
    .notEmpty()
    .withMessage("Role is required"),
  body("companyType")
    .optional()
    .isString()
    .withMessage("Company type must be a string"),
  body("currentTechnologies")
    .optional()
    .isString()
    .withMessage("Current technologies must be a string"),
  body("currentExperience")
    .optional()
    .isString()
    .withMessage("Current experience must be a string"),
  body("address")
    .isString()
    .withMessage("Address must be a string")
    .notEmpty()
    .withMessage("Address is required"),
  body("language")
    .optional()
    .isIn(["TELUGU", "HINDI", "ENGLISH"])
    .withMessage("Language must be one of TELUGU, HINDI, or ENGLISH"),
  body("noticePeriod")
    .optional()
    .isNumeric()
    .withMessage("Notice period must be a number"),
];

const userValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(errors);
  next();
};

module.exports = { userValidation, rules };
