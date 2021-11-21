const { check } = require('express-validator');
const add = {};

add.generateValidators =  [
    check('name')
    .not().
    isEmpty()
    .trim()
    .isLength({min: 3})
    .withMessage('Minimum 3 characters required!'),
        
    check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Enter valid email'),
    
    check('password', 'The password must be 5+ chars long and contain a number')
    .not()
    .isIn(['123', 'password', 'god'])
    .withMessage('Do not use a common word as the password')
    .isLength({ min: 5 })
    .matches(/\d/)
]

module.exports = add;
