import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="views/cadastro-usuario.js">Cadastro</Link>
        </li>
        <li>
          <Link to="views/login.js">Login</Link>
        </li>
        <li>
          <Link to="views/cadastro-produto.js">Cadastro de Produtos</Link>
        </li>
        <li>
          <Link to="views/historico-produtos.js">Histórico de Produtos</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
