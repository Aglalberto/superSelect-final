import express from 'express';
import { cadastrarProduto, listarProdutos } from '../controllers/productController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import { listarComentarios, adicionarComentario } from "../controllers/productController.js";

const router = express.Router();

// Rota para cadastrar produto
router.post('/produto', authenticateToken, cadastrarProduto);

// Rota para listar produtos
router.get('/produtos', authenticateToken, listarProdutos);

export default router;

router.get("/:id/comentarios", authenticateToken, listarComentarios);
router.post("/:id/comentarios", authenticateToken, adicionarComentario);

