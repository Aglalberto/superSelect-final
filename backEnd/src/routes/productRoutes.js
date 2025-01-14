import express from 'express';
import {
    cadastrarProduto,
    listarProdutos,
    listarComentarios,
    adicionarComentario,
    editarProduto,
    excluirProduto,
} from '../controllers/productController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('src', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Rota para cadastrar produto com upload de imagem
router.post('/produto', authenticateToken, upload.single('imagem'), cadastrarProduto);

// Rota para editar produto com upload opcional de imagem
router.put('/produto/:id', authenticateToken, upload.single('imagem'), editarProduto);

// Rota para listar produtos
router.get('/produtos', authenticateToken, listarProdutos);

// Rota para listar comentários de um produto
router.get('/:id/comentarios', authenticateToken, listarComentarios);
router.post('/:id/comentarios', authenticateToken, adicionarComentario);

// Rota para editar produto
router.put('/produto/:id', authenticateToken, editarProduto);

// Rota para excluir o produto
router.delete('/produto/:id', authenticateToken, excluirProduto);

export default router;
