import { useState } from "react";
import '../Login/Login.css';

export default function RegistroDoacao() {
    const [formData, setFormData] = useState({
        nome_doador: "",
        email: "",
        tipo: "",
        descricao: "",
        valor: "",
        data_entrega: "",
        local_entrega: "",
    });

    const [mensagem, setMensagem] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMensagem("Doação registrada com sucesso!");
            
            setFormData({
                nome_doador: "",
                email: "",
                tipo: "",
                descricao: "",
                valor: "",
                data_entrega: "",
                local_entrega: "",
            });
            
            
        } catch (error) {
            console.error(error);
            setMensagem("Erro ao registrar doação: " + (error.response?.data?.error || "Erro de conexão"));
        }
        setTimeout(() => {
            setMensagem("");
        },5000)
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="campanha-container">
                <h1>Registro de Doação</h1>

                {mensagem && (
                    <p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>
                        {mensagem}
                    </p>
                )}

                <form className="form-campanha" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome do Doador</label>
                        <input
                            type="text"
                            name="nome_doador"
                            value={formData.nome_doador}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>E-mail ou Contato</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Tipo de Doação</label>
                        <select
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Alimentos">Alimentos</option>
                            <option value="Roupas">Roupas</option>
                            <option value="Serviços">Serviços</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Descrição</label>
                        <textarea
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Valor ou Quantidade</label>
                        <input
                            type="number"
                            name="valor"
                            value={formData.valor}
                            onChange={handleChange}
                            step="0.01"
                        />
                    </div>

                    <div className="form-group">
                        <label>Data da Entrega</label>
                        <input
                            type="date"
                            className="form-control"
                            name="data_entrega"
                            value={formData.data_entrega}
                            onChange={handleChange}
                            required
                            max={new Date().toISOString().split("T")[0]} // impede seleção de datas futuras
                          />
                    </div>

                    <div className="form-group">
                        <label>Local da Entrega</label>
                        <input
                            type="text"
                            name="local_entrega"
                            value={formData.local_entrega}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-cadastrar">Registrar Doação</button>
                </form>
            </div>
        </div>
    );
}
