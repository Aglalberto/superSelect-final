import React, { useState } from 'react';
import axios from 'axios';


const CadastroUsuario = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [erro, setErro] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    // Atualiza o objeto `cadastrar` com os valores dos inputs
    const dadosCadastro = {
      nome: name,
      email: email,
      senha: password,
    };

    axios.post('http://localhost:3001/auth/register', dadosCadastro)
      .then(response => {
        console.log(response.data);
        alert('Usuário Cadastrado com Sucesso!!!');
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.error('Erro ao Cadastrar Usuário:', error);
        setErro(error.response?.data || 'Erro desconhecido');
      });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Cadastro Usuário</h2>
      {erro && <div style={{ color: 'red' }}>{erro}</div>}
      <form onSubmit={handleSubmit} method='post' >
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
