// src/utils/validators.js

const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateLoanCreation = [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('interestRate').isNumeric().withMessage('Interest rate must be a number'),
    body('duration').isNumeric().withMessage('Duration must be a number'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    validateLoanCreation,
    validateRequest,
};
