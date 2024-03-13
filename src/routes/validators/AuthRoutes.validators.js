const { body } = require('express-validator');

const loginValidation = [
    body('phone').notEmpty().withMessage('phone is required.'),
    body('password').isLength({ min: 8, max: 100 }).withMessage('Password must be more than 8 characters long').trim(),
];

const registerValidation = [
    body('phone').notEmpty().withMessage('phone is required.'),
    body('password').isLength({ min: 8, max: 100 }).withMessage('Password must be more than 8 characters long').trim(),
    body('firstname').notEmpty().withMessage('firstname is required.'),
    body('firstname').notEmpty().withMessage('lastname is required.'),
];

module.exports = {
    loginValidation,
    registerValidation,
};
