import usersController from '../controllers/usersController.js';
import express from 'express';
const router = express.Router();

router.get('/users', usersController.index);

export default router;
