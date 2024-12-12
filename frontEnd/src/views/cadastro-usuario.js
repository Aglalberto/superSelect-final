import React, { useState } from 'react';

function CadastroUsuario() {

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Cadastro Usuário</h2>
      <form action='url/register' method='POST'>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input  
            name='name'
            type="text"
            id="name"
            placeholder="Digite seu nome"
            
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