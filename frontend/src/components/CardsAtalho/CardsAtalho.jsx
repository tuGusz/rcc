import './style.css'
import { Link } from 'react-router-dom';

export default function CardsAtalho() {
    return (
        <>
            <div className="cards">
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

            </div>
        </>
    )
}