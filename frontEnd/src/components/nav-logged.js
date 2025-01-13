import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavLogged({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');

    // Atualiza o estado de login
    setIsLoggedIn(false);

    // Redireciona para a tela de login
    navigate('/login');
  };

  // Função para adicionar classe 'ativo' nos itens do menu
  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo ou Título */}
          <div className="logo-container">
            <img src="assets/imgs/favicon.png" alt="Logo" className="logo" />
          </div>

          {/* Itens da barra de navegação */}
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link
                to="/cadastro-produto"
                className={`nav-link ${getActiveClass('/cadastro-produto')}`}
              >
                Cadastro de Produto
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/historico-produtos"
                className={`nav-link ${getActiveClass('/historico-produtos')}`}
              >
                Produtos Cadastrados
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-danger btn-sm sair-btn"
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavLogged;
