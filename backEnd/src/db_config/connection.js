import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
});

pool.getConnection()
   .then(() => console.log('Conexão com o banco de dados estabelecida'))
   .catch((err) => console.error('Erro ao conectar no banco de dados: ', err));

export default pool;
