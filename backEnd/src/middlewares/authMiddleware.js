import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho Authorization está presente
  if (!authHeader) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  // Obtém o token do cabeçalho Authorization
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado no cabeçalho Authorization.' });
  }

  try {
    // Verifica e decodifica o token JWT
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Adiciona as informações do usuário ao objeto req
    next(); // Prossegue para o próximo middleware
  } catch (error) {
    console.error('Erro ao verificar token:', error.message);
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

export default authenticateToken;