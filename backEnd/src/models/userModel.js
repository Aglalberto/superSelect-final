import connection from "../db_config/connection.js";

class UserModel {
   // Método para encontrar um usuário pelo email
   findUserByEmail = async (email) => {
      const query = `SELECT * FROM users WHERE email = ?`;
      const [result] = await connection.execute(query, [email]);
      return result[0];
   };

   // Método para criar um novo usuário
   createUser = async (name, email, passwordHash) => {
      const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
      const [result] = await connection.execute(query, [name, email, passwordHash]);
      return result.insertId;
   };
}

export default new UserModel();