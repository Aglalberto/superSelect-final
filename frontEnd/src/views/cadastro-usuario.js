import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

function CadastroUsuario() {

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Cadastro Usuário</h2>
      <form action='url/register' method='POST' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input  
            name='name'
            type="text"
            id="name"
            placeholder="Digite seu nome"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            name='email'
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            name='password'
            type="password"
            id="senha"
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroUsuario;