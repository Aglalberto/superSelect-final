import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const register = async (req, res) => {
   const { name, email, password } = req.body;
   try {
      const userExist = await userModel.findUserByEmail(email);
      if (userExist) {
         return res.status(400).json({ message: 'Email já cadastrado.' })
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const userId = await userModel.createUser(name, email, passwordHash);

      res.status(201).json({ message: 'Usuário Criado', userId })

   } catch (error) {
      res.status(500).json({ error: error.message });
   }
}


export const login = async (req, res) => {
   const { email, password } = req.body
   try {
      const user = await userModel.findUserByEmail(email);
      if (!user) {
         return res.status(400).json({ message: "Usuário ou senha inválidos" });
      }
      const isPassordValid = await bcrypt.compare(password, user.password);
      if (!isPassordValid) {
         return res.status(400).json({ message: "Usuário ou senha inválidos" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expires: '1h' });
      console.log(token);
      res.json({ token })
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
};

