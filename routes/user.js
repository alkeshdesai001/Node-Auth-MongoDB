import express from 'express';
const router = express.Router();

import { signUp, login } from '../controllers/user';
import { signUpValidator, loginValidator } from '../controllers/userValidator';
import result from '../middleware/validationResult';

router.post('/auth/signup', signUpValidator, result, signUp);
router.post('/auth/login', loginValidator, result, login);

export default router;
