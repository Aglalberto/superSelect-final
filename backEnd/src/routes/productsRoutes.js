import productsController from '../controllers/productsController.js';
import express from 'express';
const router = express.Router();

router.get('/products', productsController.index);
router.get('/products/:id', productsController.show);

export default router;
