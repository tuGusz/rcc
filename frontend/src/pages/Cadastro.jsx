import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api';
import './Login/Login.css';

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("Membro");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        const userData = { nome, email, password, role };

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

    return (
        <div className="login-container loaded">
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="col-md-6 col-lg-5 login-card">
                    <div className="login-header text-center mb-4">
                        <h1>Cadastro de Usuário</h1>
                        <p>Preencha os dados para cadastrar um novo usuário</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 form-group-animate">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
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
    );
}
