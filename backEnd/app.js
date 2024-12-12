import express from 'express';
import loginRoutes from './src/routes/loginRoutes.js';
import productsRoutes from './src/routes/productsRoutes.js';
import usersRoutes from './src/routes/usersRoutes.js';
const app = express();

app.use(loginRoutes);
app.use(productsRoutes);
app.use(usersRoutes);

export default app;
