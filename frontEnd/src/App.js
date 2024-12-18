import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroProduto from "./views/cadastro-produto";
import Header from "./components/header";
import HistoricoProdutos from './views/historico-produtos';
import CadastroUsuario from './views/cadastro-usuario';
import Login from './views/login';
import Logo from './components/logo';
import './App.css';

function App() {
  return (
    <div className="App">
      <Logo/>
      <Router>
        <Header/>
        <div className="main-content">
          <Routes>
            <Route path="views/login.js" element={<Login />} />
            <Route path="views/cadastro-usuario.js" element={<CadastroUsuario />} />
            <Route path="views/cadastro-produto.js" element={<CadastroProduto />} />
            <Route path="views/historico-produtos.js" element={<HistoricoProdutos />} />
          </Routes>
        </div>
      </Router>  
    </div>
  );
}

export default App;
