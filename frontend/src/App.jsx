import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MenuHamburguer from './components/MenuHamburguer/MenuHamburguer';
import Login from './pages/Login/Login';
import CardsAtalho from './components/CardsAtalho/CardsAtalho';
import Campanha from './pages/Campanha';
import ListagemCampanha from './pages/ListagemCampanha';
import GerenciarProdutos from './pages/GerenciarTiposProdutos';
import GerenciarMensalidades from './pages/Mensalidades';
import FormAssociados from './pages/Associados';
import Comissao from './pages/Comissao';
import RegistroDoacao from './pages/daocao/RegistroDoacao';
import ListaDoacoes from './pages/daocao/ListarDoacao';

import PrivateRoute from './components/PrivateRoute';
import Cadastro from './pages/Cadastro';  // Componente de cadastro

import './App.css'; // Certifique-se de ter estilos apropriados

function App() {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  if (loading) return <div>Carregando...</div>;

  return (
    <Router>
      <div className={`app-container ${user ? 'logged-in' : ''}`}>
        {/* Renderiza o MenuHamburguer apenas se o usuário estiver logado */}
        {user && <MenuHamburguer />}

        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/cadastro" 
              element={user && user.role === "Administrador" ? <Cadastro /> : <Navigate to="/login" />} 
            /> {/* Só administradores podem acessar o cadastro */}
            {/* Adiciona PrivateRoute para proteger as páginas que só podem ser acessadas com login */}
            <Route path="/" element={user ? <CardsAtalho /> : <Navigate to="/login" />} />
            <Route path="/registrar-doacao" element={user ? <RegistroDoacao /> : <Navigate to="/login" />} />
            <Route path="/listar-doacao" element={user ? <ListaDoacoes /> : <Navigate to="/login" />} />
            <Route path="/campanha" element={user ? <Campanha /> : <Navigate to="/login" />} />
            <Route path="/list-campanhas" element={user ? <ListagemCampanha /> : <Navigate to="/login" />} />
            <Route path="/gerenciar-tipos-produtos" element={user ? <GerenciarProdutos /> : <Navigate to="/login" />} />
            <Route path="/netflix-ta-cara-meus-anjos" element={user ? <GerenciarMensalidades /> : <Navigate to="/login" />} />
            <Route path="/associado" element={user ? <FormAssociados /> : <Navigate to="/login" />} />
            <Route path="/comissao" element={user ? <Comissao /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
