import React, { useState } from 'react';

function Login() {

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Login</h2>
      <form action='url/login' method='POST'>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;