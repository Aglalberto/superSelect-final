import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) { // Receber a função setIsLoggedIn como prop

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Verificar se o usuário já está logado ao carregar a página de login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      navigate('/cadastro-produto'); // Se já estiver logado, redireciona para a página de cadastro de produto
    }
  }, [setIsLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });

      console.log('Token:', response.data.token);
      // Armazenar o token no localStorage
      localStorage.setItem('token', response.data.token);
      
      // Atualizar o estado de login no App.js
      setIsLoggedIn(true);

      // Redirecionar para a página de cadastro de produto
      navigate('/cadastro-produto');
    } catch (err) {
      console.error('Erro ao realizar login:', err);
      setError(err.response?.data?.message || 'Erro no login');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
