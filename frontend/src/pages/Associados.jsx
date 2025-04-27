import React, { useState, useContext } from "react";
import { MenuContext } from "../context/MenuContext";
import AssociadoService from "../services/AssociadosService"; // Importe o serviço

const associadoService = new AssociadoService();

const FormAssociados = () => {
  const { isMenuOpen } = useContext(MenuContext);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false); // Para controlar o estado de carregamento
  const [mensagem, setMensagem] = useState("");    // Para exibir mensagens de sucesso ou erro

  const handleSubmit = async () => {
    setLoading(true); // Inicia o carregamento
    setMensagem("");    // Limpa qualquer mensagem anterior
    try {
      // Cria um objeto associado com os dados do formulário
      const novoAssociado = {
        cpf,
        nome,
        email,
        telefone,
        endereco,
        status,
        data_nascimento: dataNascimento, // Certifique-se de que o nome do campo corresponde ao do banco de dados
        foto: foto ? foto : null, //envia null se não houver foto
      };

      // Chama o serviço para criar o associado
      await associadoService.criarAssociado(novoAssociado);
      setMensagem("Associado cadastrado com sucesso!"); // Define a mensagem de sucesso

      // Limpa o formulário após o cadastro bem-sucedido
      setNome("");
      setCpf("");
      setEmail("");
      setTelefone("");
      setEndereco("");
      setDataNascimento("");
      setStatus("Ativo");
      setFoto(null);

    } catch (error) {
      setMensagem("Erro ao cadastrar associado: " + error.message); // Define a mensagem de erro
      console.error("Erro ao cadastrar associado:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento, independentemente do resultado
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(file); // Converte o arquivo para base64
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", marginLeft: isMenuOpen ? "250px" : "0px", transition: "margin-left 0.3s ease" }}>
      <h2 style={{ fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
        Cadastro de Associados
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "20px",
          background: "#e3e3e3",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
          minHeight: "450px",
        }}
      >
        {/* Parte da foto */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              width: "150px",
              height: "150px",
              background: foto ? `url(${foto}) center/cover` : "#f0f0f0",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!foto && <span>Sem foto</span>}
          </div>
          <input type="file" onChange={handleFotoChange} />
        </div>

        {/* Formulário de dados */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "15px" }}>
          <div>
            <label style={{ fontWeight: "bold", display: "block" }}>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome aqui"
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block" }}>CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite o CPF aqui"
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block" }}>Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Digite o endereço aqui"
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o email aqui"
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
                width: "100%",
              }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
          <div>
            <label style={{ fontWeight: "bold", display: "block" }}>Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Digite o telefone aqui"
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block" }}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
                width: "100%",
              }}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block" }}>Data de Nascimento</label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px",
                width: "100%",
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            textAlign: "center",
          }}
        >
          <button
            onClick={handleSubmit}
            disabled={loading} // Desabilita o botão durante o carregamento
            style={{
              backgroundColor: loading ? "rgba(0, 123, 255, 0.5)" : "rgba(0, 123, 255, 0.7)", // Altera a cor do botão enquanto carrega
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer", // Altera o cursor
              border: "none",
              opacity: loading ? 0.7 : 1, // Diminui a opacidade durante o carregamento
            }}
          >
            {loading ? "Cadastrando..." : "Salvar"} {/* Exibe "Cadastrando..." durante o carregamento */}
          </button>
          {mensagem && (
            <p style={{ marginTop: "10px", color: mensagem.startsWith("Erro") ? "red" : "green" }}>
              {mensagem}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormAssociados;
