import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';

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
import Cadastro from './pages/Cadastro';  
import Caixas from './pages/Caixas';
import Recuperar from './pages/RecuperarSenha';
import Frequencia from './pages/RegistrarFrequencia';
import Reunioes from './pages/Eventos';
import Estoque from './pages/Estoque';  
import RelatorioFrequencia from './pages/RelatorioFrequencia';  

import './App.css';

function App() {
  const { user, loading, isAdmin, isModerator } = useContext(AuthContext);

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  if (loading) return <div>Carregando...</div>;

  return (
    <MenuProvider>
      <Router>
        <div className={`app-container ${user ? 'logged-in' : ''}`}>
          {user && <MenuHamburguer />}

          <div className="main-content">
           <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-senha" element={<Recuperar />} />

            <Route path="/cadastro" element={isAdmin() ? <Cadastro /> : <Navigate to="/login" />} />
            <Route path="/caixas" element={isAdmin() ? <Caixas /> : <Navigate to="/login" />} />

            <Route path="/campanha" element={(isAdmin() || isModerator()) ? <Campanha /> : <Navigate to="/login" />} />
            <Route path="/list-campanhas" element={(isAdmin() || isModerator()) ? <ListagemCampanha /> : <Navigate to="/login" />} />
            <Route path="/gerenciar-tipos-produtos" element={(isAdmin() || isModerator()) ? <GerenciarProdutos /> : <Navigate to="/login" />} />
            <Route path="/netflix-ta-cara-meus-anjos" element={(isAdmin() || isModerator()) ? <GerenciarMensalidades /> : <Navigate to="/login" />} />
            <Route path="/associado" element={(isAdmin() || isModerator()) ? <FormAssociados /> : <Navigate to="/login" />} />
            <Route path="/comissao" element={(isAdmin() || isModerator()) ? <Comissao /> : <Navigate to="/login" />} />
            <Route path="/eventos" element={(isAdmin() || isModerator()) ? <Reunioes /> : <Navigate to="/login" />} />
            <Route path="/relatorios" element={(isAdmin() || isModerator()) ? <RelatorioFrequencia /> : <Navigate to="/login" />} />
            <Route path="/estoque" element={(isAdmin() || isModerator()) ? <Estoque /> : <Navigate to="/login" />} />

            <Route path="/" element={user ? <CardsAtalho /> : <Navigate to="/login" />} />
            <Route path="/registrar-frequencia" element={user ? <Frequencia /> : <Navigate to="/login" />} />
            <Route path="/registrar-doacao" element={user ? <RegistroDoacao /> : <Navigate to="/login" />} />
            <Route path="/listar-doacao" element={user ? <ListaDoacoes /> : <Navigate to="/login" />} />
          </Routes>
          </div>
        </div>
      </Router>
    </MenuProvider>
  );
}

export default App;
