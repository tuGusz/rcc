import './style.css';
import React, { useState } from "react";
 
const GerenciarProdutos = () => {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("KG");
  const [detalhes, setDetalhes] = useState("");
  const [adicionados, setAdicionados] = useState([]);
  const [cadastrados, setCadastrados] = useState([]);
  const [erros, setErros] = useState({ nome: false, quantidade: false });

  const adicionarProduto = () => {
    if (!nome || !quantidade) {
      setErros({
        nome: !nome,
        quantidade: !quantidade,
      });
      return;
    }
    setAdicionados([
      ...adicionados,
      { nome, quantidade, unidade, detalhes: detalhes || "Nenhum detalhe" },
    ]);
    setNome("");
    setQuantidade("");
    setDetalhes("");
    setUnidade("KG");
    setErros({ nome: false, quantidade: false });
  };

  const cadastrarProdutos = () => {
    setCadastrados([...cadastrados, ...adicionados]);
    setAdicionados([]);
  };

  const excluirProduto = (index, isAdicionado) => {
    if (isAdicionado) {
      setAdicionados(adicionados.filter((_, i) => i !== index));
    } else {
      setCadastrados(cadastrados.filter((_, i) => i !== index));
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
        Gerenciar Produtos
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Formulário */}
        <div
          style={{
            width: "45%",
            padding: "20px",
            background: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>Cadastrar Produtos</h3>
          <input
            type="text"
            placeholder="Digite o nome do produto *"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: erros.nome ? "1px solid red" : "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          {erros.nome && (
            <p style={{ color: "red", margin: "0 0 10px 0" }}>
              Nome é obrigatório!
            </p>
          )}
          <input
            type="number"
            placeholder="Quantidade *"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: erros.quantidade ? "1px solid red" : "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          {erros.quantidade && (
            <p style={{ color: "red", margin: "0 0 10px 0" }}>
              Quantidade é obrigatória!
            </p>
          )}
          <select
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <option value="KG">KG</option>
            <option value="Grama">Grama</option>
            <option value="Litro">Litro</option>
            <option value="Unidade">Unidade</option>
            <option value="Caixa">Caixa</option>
          </select>
          <textarea
            placeholder="Adicionar detalhes (opcional)"
            value={detalhes}
            onChange={(e) => setDetalhes(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={adicionarProduto}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            + Adicionar Produto
          </button>
          <button
            onClick={cadastrarProdutos}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cadastrar
          </button>
        </div>

        {/* Produtos Adicionados */}
        <div style={{ width: "50%" }}>
          <h3>Produtos Adicionados</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Unidade</th>
                <th>Detalhes</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {adicionados.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.nome}</td>
                  <td>{produto.quantidade}</td>
                  <td>{produto.unidade}</td>
                  <td>{produto.detalhes}</td>
                  <td>
                    <button
                      onClick={() => excluirProduto(index, true)}
                      style={{
                        backgroundColor: "red",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Produtos Cadastrados */}
          <h3>Produtos Cadastrados</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Unidade</th>
                <th>Detalhes</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cadastrados.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.nome}</td>
                  <td>{produto.quantidade}</td>
                  <td>{produto.unidade}</td>
                  <td>{produto.detalhes}</td>
                  <td>
                    <button
                      onClick={() => excluirProduto(index, false)}
                      style={{
                        backgroundColor: "red",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GerenciarProdutos;
