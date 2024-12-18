import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CadastroProduto from "./views/cadastro-produto";
import NavLogin from "./components/nav-login";
import NavLogged from "./components/nav-logged";
import HistoricoProdutos from './views/historico-produtos';
import CadastroUsuario from './views/cadastro-usuario';
import Login from './views/login';
import { useState, useEffect } from 'react';
import Comentarios from './components/comentarios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar se o token existe no localStorage e se o usuário está logado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []); // UseEffect será chamado uma vez, ao carregar o componente

  return (
    <div className="App">
      <Router>
        {/* Exibe o NavLogin se não estiver logado, ou NavLogged se estiver logado */}
        {isLoggedIn ? (
          <NavLogged setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <NavLogin />
        )}

        <div className="main-content">
          <Routes>
            {/* Rota inicial: redireciona para a página de login se não estiver logado */}
            <Route path="/" element={isLoggedIn ? <Navigate to="/historico-produtos" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
            <Route path="/cadastro-produto" element={<CadastroProduto />} />
            <Route path="/historico-produtos" element={<HistoricoProdutos />} />
            <Route path="/comentarios" element={<Comentarios setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
