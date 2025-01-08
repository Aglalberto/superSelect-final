import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavLogged({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation(); // UseLocation para obter a rota atual

  const handleLogout = () => {
    // Remover o token do localStorage
    localStorage.removeItem('token');

    // Atualizar o estado de login
    setIsLoggedIn(false);

    // Redirecionar para a tela de login
    navigate('/login');
  };

  // Função para adicionar classe de 'ativo' aos itens do menu
  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* Logo ou Título (Opcional) */}
          <img src="assets/imgs/favicon.png" alt="Logo" />

          {/* Botão "Sair" posicionado no canto superior direito */}
          <div className="position-absolute top-0 end-0 p-3">
            <button onClick={handleLogout} className="btn btn-danger">
              Sair
            </button>
          </div>

          <ul className="navbar-nav ms-auto">
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
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavLogged;
