import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {

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
    <div className="container" style={{ maxWidth: '500px' }}>
      <h2 className="text-center my-3 fs-3">Acesse o sistema</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            name="email"
            type="email"
            id="email"
            className="form-control"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <input
            name="password"
            type="password"
            id="password"
            className="form-control"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 btn-lg">Acessar</button>
      </form>
    </div>
  );
}

export default Login;
