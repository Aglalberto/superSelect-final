import React, { useState } from 'react';
import axios from 'axios';

const CadastroUsuario = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <div className="container" style={{ maxWidth: '500px' }}>
      <h2 className="text-center my-3 fs-3">Realize seu cadastro</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome</label>
          <input
            name="name"
            type="text"
            id="name"
            className="form-control"
            placeholder="Digite seu nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

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

        <button type="submit" className="btn btn-success w-100 btn-lg">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroUsuario;
