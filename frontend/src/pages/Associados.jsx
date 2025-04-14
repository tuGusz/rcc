import React, { useState } from "react";

const FormAssociados = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [foto, setFoto] = useState(null);

  const handleSubmit = () => {
    alert("Cadastro enviado com sucesso!");
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setFoto(URL.createObjectURL(file));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
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
            style={{
              backgroundColor: "rgba(0, 123, 255, 0.7)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAssociados;
