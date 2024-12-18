import React from 'react';
import { Link } from 'react-router-dom';

function NavLogin() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/cadastro-usuario">Cadastro</Link> {/* Caminho sem a extensão .js */}
        </li>
        <li>
          <Link to="/login">Login</Link> {/* Caminho sem a extensão .js */}
        </li>
      </ul>
    </nav>
  );
}

export default NavLogin;
