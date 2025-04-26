import './style.css';
import { useState, useContext } from "react";
import ImgMimosa from '../../assets/imgs/logo_mimosa.jpg';
import IconNotificacao from '../../assets/imgs/notificacao.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function MenuHamburguer() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext); // Use o logout diretamente do AuthContext
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        logout(); // Usando a função de logout do AuthContext
        navigate("/login");
    };

    // Se o usuário não estiver logado, não renderiza o menu
    if (!user) return null; // Evita renderizar o MenuHamburguer caso não tenha um usuário

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
                  
                    <Link to="/campanha" className="link-hamburg">
                        <li>Cadastrar campanhas</li>
                    </Link>
                    <Link to="/associado" className="link-hamburg">
                        <li>Cadastrar associados</li>
                    </Link>
                    <li>Cadastrar títulos</li>
                    <Link to="/netflix-ta-cara-meus-anjos" className="link-hamburg">
                        <li>Cadastrar Despesas</li>
                    </Link>
                    <li>Cadastrar cargos</li>
                    <Link to="/gerenciar-tipos-produtos" className="link-hamburg">
                        <li>Cadastrar Produtos</li>
                    </Link>
                    
                    {/* Mostrar "Cadastrar Usuário" somente para Administradores */}
                    {user?.role === "Administrador" && (
                        <Link to="/cadastro" className="link-hamburg">
                            <li>Cadastrar Usuário</li>
                        </Link>
                    )}
                    
                    <div className='side-cabecalho'>
                    </div>
                    <Link to="/registrar-doacao" className="link-hamburg">
                        <li>Registrar de Doação</li>
                    </Link>
                    
                    <div className='side-cabecalho'>
                    </div>
                    <Link to="/list-campanhas" className="link-hamburg">
                        <li>Campanhas cadastradas</li>
                    </Link>
                    <Link to="/listar-doacao" className="link-hamburg">
                        <li>lista de Doação</li>
                    </Link>
                    
                    <li className="logout" onClick={handleLogout}>Sair</li>
                </ul>
            </div>

            <div className="navbar-list">
                <img src={IconNotificacao} alt="Icone sino" />
                <img src={ImgMimosa} alt="Logo Rotaract Mimosa" id="icon-mimosa"/>
                <p>RRC |</p>
                <p className="user-name">{user?.nome}</p> {/* Exibindo o nome do usuário */}
                <p>|</p>
                <p className="user-role">{user?.role}</p> {/* Exibindo a role do usuário */}
                <button className="logout-button" onClick={handleLogout}>Sair</button>
            </div>
        </nav>
    );
}
