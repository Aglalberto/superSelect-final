import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import pool from '../db_config/connection.js'

export const register = async (req, res) => {
   const { nome, email, senha } = req.body;

   if (!nome || !email || !senha) {
      return res.status(400).send('Todos os campos são obrigatórios');
   }

   try {
      // Verificar se o email já existe
      const sqlEmail = 'SELECT * FROM users WHERE email = ?';
      const [consulta] = await pool.query(sqlEmail, [email]);
      if (consulta.length > 0) {
         return res.status(409).send('Email já cadastrado');
      }

      // Criptografar senha e inserir no banco
      const senhaHash = await bcrypt.hash(senha, 10);
      const sql = 'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)';
      await pool.query(sql, [nome, email, senhaHash]);

      res.status(201).send('Usuário cadastrado com sucesso!');
   } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao cadastrar usuário');
   }
};

export const login = async (req, res) => {
   const { email, password } = req.body;
   
   if (!email || !password) {
     return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
   }
 
   try {
     // Certifique-se de passar o email para o método findUserByEmail
     const user = await userModel.findUserByEmail(email);
 
     // Se o usuário não for encontrado, retorna erro 400
     if (!user) {
       return res.status(400).json({ message: 'Usuário não encontrado' });
     }
 
     // Comparar a senha enviada com a senha criptografada no banco
     const isPasswordValid = await bcrypt.compare(password, user.senha);
     if (!isPasswordValid) {
       return res.status(400).json({ message: 'Senha inválida' });
     }
 
     // Gerar o token de autenticação
     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
     
     // Retornar o token para o cliente
     res.json({ token });
   } catch (error) {
     console.error('Erro ao realizar login:', error);
     res.status(500).json({ message: 'Erro interno no servidor.' });
   }
 };

