const { check } = require('express-validator');

exports.signUpValidator = [
  check('email', 'Please enter valid email id').isEmail().normalizeEmail(),
  check('name', 'Username is required').not().isEmpty(),
  check('password', 'Password must be minimum 6 character long').isLength({
    min: 6,
  }),
  check('role').custom((value) => {
    let options = ['user', 'publisher'];
    if (!options.includes(value)) {
      throw new Error(`User role ${value} is not allowed`);
    }
    return true;
  }),
];

exports.loginValidator = [
  check('email', 'Please enter valid email id').isEmail().normalizeEmail(),
  check('password', 'Password must be minimum 6 character long').isLength({
    min: 6,
  }),
];
