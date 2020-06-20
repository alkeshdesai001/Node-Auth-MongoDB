const express = require('express');
const router = express.Router();

const { signUp, login } = require('../controllers/user');
const {
  signUpValidator,
  loginValidator,
} = require('../controllers/userValidator');
const result = require('../middleware/validationResult');

router.post('/auth/signup', signUpValidator, result, signUp);
router.post('/auth/login', loginValidator, result, login);

module.exports = router;
