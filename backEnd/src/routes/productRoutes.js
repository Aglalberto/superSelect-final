import express from 'express';

import {
    cadastrarProduto,
    listarProdutos,
    listarComentarios,
    adicionarComentario,
    editarProduto,
    excluirProduto
} from '../controllers/productController.js';

import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rota para cadastrar produto
router.post('/produto', authenticateToken, cadastrarProduto);

// Rota para listar produtos
router.get('/produtos', authenticateToken, listarProdutos);

// Rota para listar comentários de um produto
router.get("/:id/comentarios", authenticateToken, listarComentarios);
router.post("/:id/comentarios", authenticateToken, adicionarComentario);

// Rota para editar produto
router.put('/produto/:id', authenticateToken, editarProduto);

// Rota para excluir o produto
router.delete('/produto/:id', authenticateToken, excluirProduto);


export default router;
