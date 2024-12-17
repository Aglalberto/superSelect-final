import express from 'express';
import authRoutes from './src/routes/authRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Permitir requisições do frontend

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

export default app;
