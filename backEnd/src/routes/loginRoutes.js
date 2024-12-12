import loginController from '../controllers/loginController.js';
import express from 'express';
const router = express.Router();

router.get('/login', loginController.login);

export default router;