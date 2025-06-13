import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";
import api from '../services/api';
import './Login/Login.css';

export default function Cadastro() {
    const { isMenuOpen } = useContext(MenuContext);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("Membro");
    const [cpfAssociado, setCpfAssociado] = useState('');
    const [emailAssociado, setEmailAssociado] = useState('');
    const [nomeBloqueado, setNomeBloqueado] = useState(false);
    const [emailbloqueado, setemailBloqueado] = useState(false);
    const [associadosDisponiveis, setAssociadosDisponiveis] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        const userData = { nome, email, password, role, cpf_associado: cpfAssociado };


        try {
            await api.post("/registrar", userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            alert("Cadastro realizado com sucesso!");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.error || "Erro ao realizar cadastro");
        }
    };

    useEffect(() => {
    async function carregarAssociados() {
        try {
            const response = await api.get("/associados", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setAssociadosDisponiveis(response.data.rows || []);
        } catch (error) {
            console.error("Erro ao carregar associados:", error);
        }
    }

    carregarAssociados();
    }, []);


    return (
        <div style={{ 
            padding: "20px",
            marginLeft: isMenuOpen ? "250px" : "0px",
            transition: "margin-left 0.3s ease"
          }}>
        <div className="login-container loaded">
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="col-md-6 col-lg-5 login-card">
                    <div className="login-header text-center mb-4">
                        <h1>Cadastro de Usuário</h1>
                        <p>Preencha os dados para cadastrar um novo usuário</p>
                    </div>
                    <div className="mb-3 form-group-animate">
                        <select
                        className="form-control form-control-lg"
                        value={cpfAssociado}
                        onChange={(e) => {
                            const cpf = e.target.value;
                            setCpfAssociado(cpf);

                            const associadoSelecionado = associadosDisponiveis.find(a => a.cpf === cpf);

                            if (associadoSelecionado) {
                                setNome(associadoSelecionado.nome);
                                setEmail(associadoSelecionado.email);
                                setNomeBloqueado(true);
                                setemailBloqueado(true);
                            } else {
                                setNome('');
                                setEmail('');
                                setNomeBloqueado(false);
                                setemailBloqueado(false);
                            }
                        }}

                        required
                        >
                        <option value="">Selecione um associado...</option>
                        {associadosDisponiveis.map((a) => (
                            <option key={a.cpf} value={a.cpf}>
                            {a.nome} - CPF: {a.cpf}
                            </option>
                        ))}
                        </select>
                    </div>


                   

                    <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-group-animate">
                    <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            disabled={nomeBloqueado}
                            required
                        />
                        </div>

                        <div className="mb-3 form-group-animate">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled ={emailbloqueado}
                                required
                            />
                        </div>
                        <div className="mb-3 form-group-animate">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 form-group-animate">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Repetir Senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4 form-group-animate">
                            <select
                                className="form-control form-control-lg"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="Membro">Membro</option>
                                <option value="Moderador">Moderador</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 login-button"
                        >
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
}
