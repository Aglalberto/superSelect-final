import React, { useState } from 'react';
import axios from 'axios';


const CadastroUsuario = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [cadastrar, setCadastrar] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  const [erro, setErro] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/register', cadastrar)
      .then(response => {
        console.log(response.data)
        alert('Usuário Cadastrado com Sucesso!!!')
        setCadastrar({
          nome: '',
          email: '',
          senha: ''
        })
      })
      .catch(error => {
        console.error('Erro ao Cadastrar Usuário: ', error)
        setErro(error.response.data)
      })
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Cadastro Usuário</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            name="name"
            type="text"
            id="name"
            placeholder="Digite seu nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroUsuario;
