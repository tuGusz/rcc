import './style.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function CardsAtalho() {
  const { isAdmin, isModerator, isMember } = useContext(AuthContext);

  return (
    <div className="cards">
      {/* Admin + Moderador */}
      {(isAdmin() || isModerator()) && (
        <>
          <div className="card">
            <Link to="/campanha">
              <h3>Cadastrar Campanha</h3>
            </Link>
          </div>

          <div className="card">
            <Link to="/associado">
              <h3>Cadastrar Associado</h3>
            </Link>
          </div>

          <div className="card">
            <Link to="/comissao">
              <h3>Cadastrar Comissões</h3>
            </Link>
          </div>

          <div className="card">
            <Link to="/list-campanhas">
              <h3>Campanhas Cadastradas</h3>
            </Link>
          </div>

          <div className="card">
            <Link to="/netflix-ta-cara-meus-anjos">
              <h3>Cadastrar Despesas</h3>
            </Link>
          </div>

          <div className="card">
            <Link to="/gerenciar-tipos-produtos">
              <h3>Cadastrar Produtos</h3>
            </Link>
          </div>

          <div className="card">
            <Link to="/estoque">
              <h3>Gerenciar Estoque</h3>
            </Link>
          </div>
        </>
      )}

      {/* Apenas Admin */}
      {isAdmin() && (
        <div className="card">
          <Link to="/caixas">
            <h3>Gerenciar Caixa</h3>
          </Link>
        </div>
      )}

      {/* Se quiser adicionar cards para membros simples no futuro, coloca aqui */}
      {isMember() && (
        <div className="card">
          <Link to="/registrar-frequencia">
            <h3>Registrar Frequência</h3>
          </Link>
        </div>
      )}
    </div>
  );
}
