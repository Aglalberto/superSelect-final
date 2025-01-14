import express from 'express';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js'; // Importar rotas de produtos
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Permitir requisições do frontend

// Rotas
app.use('/auth', authRoutes); // Prefixo para autenticação
app.use('/produtos', productRoutes); // Prefixo para produtos

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Cria __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

const uploadsDir = path.resolve('src', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export default app;
