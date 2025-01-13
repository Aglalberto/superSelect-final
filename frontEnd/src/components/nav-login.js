import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavLogin() {
  const location = useLocation();  // Hook para acessar a localização atual

  // Verifica se a página atual é "cadastro-usuario"
  const isCadastroPage = location.pathname === '/cadastro-usuario';
  // Verifica se a página atual é "login"
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      <img src="/assets/imgs/logo.png" alt="Logo" className="d-block mx-auto my-3 w-50 mt-5" />

      <nav className="navbar d-flex justify-content-center">
        <ul className="list-unstyled d-flex">
          <li className="mx-2">
            <Link
              to="/cadastro-usuario"
              className={`btn btn-lg ${isCadastroPage ? 'btn-primary' : 'btn-outline-primary'}`} // Alterando a cor conforme a página
            >
              Cadastrar
            </Link>
          </li>
          <li className="mx-2">
            <Link
              to="/login"
              className={`btn btn-lg ${isLoginPage ? 'btn-primary' : 'btn-outline-primary'}`} // Alterando a cor conforme a página
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavLogin;
