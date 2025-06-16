import './style.css';
import { useContext } from "react";
import ImgMimosa from '../../assets/imgs/logo_mimosa.jpg';
import IconNotificacao from '../../assets/imgs/notificacao.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { MenuContext } from "../../context/MenuContext";

export default function MenuHamburguer() {
  const { isMenuOpen, toggleMenu } = useContext(MenuContext);
  const { user, logout, isAdmin, isModerator, isMember } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="hamburguer-icon" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>

      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <div className='side-cabecalho'>
            <Link to="/" className="link-hamburg">
              <h2>Menu</h2>
            </Link>
            <li onClick={toggleMenu}>X</li>
          </div>

          {(isAdmin() || isModerator()) && (
            <>
              <Link to="/campanha" className="link-hamburg"><li>Cadastrar Campanhas</li></Link>
              <Link to="/associado" className="link-hamburg"><li>Cadastrar Associados</li></Link>
              {/* <li>Cadastrar Títulos</li> */}
              <Link to="/netflix-ta-cara-meus-anjos" className="link-hamburg"><li>Cadastrar Despesas</li></Link>
              {/* <li>Cadastrar Cargos</li> */}
              <Link to="/gerenciar-tipos-produtos" className="link-hamburg"><li>Cadastrar Produtos</li></Link>
             <Link to="/cadastro" className="link-hamburg"><li>Cadastrar Usuário</li></Link>
            </>
          )}
      <div className='side-cabecalho'></div>
          {isAdmin() && (
            <>
                <Link to="/estoque" className="link-hamburg"><li>Gerenciar Estoque</li></Link>
              <Link to="/caixas" className="link-hamburg"><li>Gerenciar Caixa</li></Link>
         
            </>
          )}

          <div className='side-cabecalho'></div>
          {user && (
            <>
              <Link to="/registrar-doacao" className="link-hamburg"><li>Registrar Doação</li></Link>
              <Link to="/registrar-frequencia" className="link-hamburg"><li>Registrar Frequência</li></Link>
               {isAdmin() && (
      <Link to="/eventos" className="link-hamburg"><li>Registrar Eventos</li></Link>
    )}
            </>
          )}

          <div className='side-cabecalho'></div>
          {(isAdmin() || isModerator()) && (
            <>
              <Link to="/list-campanhas" className="link-hamburg"><li>Campanhas Cadastradas</li></Link>
              <Link to="/listar-doacao" className="link-hamburg"><li>Lista de Doações</li></Link>
            </>
          )}

          <div className='side-cabecalho'></div>
          <li className="logout" onClick={handleLogout}>Sair</li>
        </ul>
      </div>

      <div className="navbar-list">
        <img src={IconNotificacao} alt="Ícone sino" />
        <img src={ImgMimosa} alt="Logo Rotaract Mimosa" id="icon-mimosa" />
        <p>RRC |</p>
        <p className="user-name">{user?.nome}</p>
        <p>|</p>
        <p className="user-role">{user?.role}</p>
        <button className="logout-button" onClick={handleLogout}>Sair</button>
      </div>
    </nav>
  );
}
