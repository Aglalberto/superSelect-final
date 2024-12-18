import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavLogged({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remover o token do localStorage
    localStorage.removeItem('token');

    // Atualizar o estado de login
    setIsLoggedIn(false); // Isso vai atualizar o estado de login para false

    // Redirecionar para a tela de login
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className='navbar'>
      <ul>
        <li>
          <a href="/cadastro-produto">Cadastro de Produtos</a>
        </li>
        <li>
          <a href="/historico-produtos">Histórico de Produtos</a>
        </li>
        <li>
          {/* Botão para sair */}
          <button onClick={handleLogout}>Sair</button>
        </li>
      </ul>
    </div>
  );
}

export default NavLogged;
