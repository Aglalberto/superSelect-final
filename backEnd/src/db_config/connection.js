import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db_config = {
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
}

const connection = mysql.createPool(db_config)

const testConnection = () => {

   try {
      connection.getConnection();
      console.log(`Connected to database: ${process.env,DB_DATABASE}`)
   } catch (error) {
      console.error(`Erro to connecting databae`, error)
   }
}

testConnection();

export default connection;