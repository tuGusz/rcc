import React, { useState, useEffect } from "react";
import ProdutoService from "../services/ProdutoService.js"; 
import "./GerenciarTiposProdutos.css";  

const produtoService = new ProdutoService();

const GerenciarProdutos = () => {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("KG");
  const [detalhes, setDetalhes] = useState("");
  const [cadastrados, setCadastrados] = useState([]);
  const [erros, setErros] = useState({ nome: false, quantidade: false });
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [filtroNome, setFiltroNome] = useState(""); 
  const [adicionados, setAdicionados] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await produtoService.getAllProdutos();
        
        console.log("Produtos recebidos da API:", data);
        
        if (data && data.rows) {
          data.rows.forEach((produto, index) => {
            console.log(`Produto ${index + 1}:`, produto);
            console.log(`Data formatada: ${new Date(produto.data).toLocaleString()}`);
          });
          setCadastrados(data.rows);
        } else {
          console.log("Nenhum produto encontrado ou estrutura de dados inválida.");
        }
      } catch (error) {
        console.error("Erro ao carregar produtos cadastrados:", error);
      }
    };
  
    fetchProdutos();
  }, []);

  const adicionarProduto = () => {
    if (!nome || !quantidade) {
      setErros({
        nome: !nome,
        quantidade: !quantidade,
      });
      return;
    }

    const produtoExistente = cadastrados.find((produto) => produto.nome === nome);
    if (produtoExistente) {
      const novaQuantidade = parseInt(produtoExistente.quantidade) + parseInt(quantidade);
      produtoService.atualizarProduto(produtoExistente.id, { ...produtoExistente, quantidade: novaQuantidade })
        .then(() => {
          const produtosAtualizados = cadastrados.map((produto) =>
            produto.id === produtoExistente.id
              ? { ...produto, quantidade: novaQuantidade }
              : produto
          );
          setCadastrados(produtosAtualizados);
          setNome("");
          setQuantidade("");
          setDetalhes("");
          setUnidade("KG");
          setErros({ nome: false, quantidade: false });
        })
        .catch((error) => {
          console.error("Erro ao atualizar produto", error);
        });
    } else {
      const dataAtual = new Date();
      const dataFormatada = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, "0")}-${dataAtual.getDate().toString().padStart(2, "0")} ${dataAtual.getHours().toString().padStart(2, "0")}:${dataAtual.getMinutes().toString().padStart(2, "0")}:${dataAtual.getSeconds().toString().padStart(2, "0")}`;

      const novoProduto = {
        nome,
        quantidade,
        unidade,
        detalhes: detalhes || "Nenhum detalhe",
        data: dataFormatada,
      };

      setAdicionados(prevAdicionados => [...prevAdicionados, novoProduto]);
  
      produtoService.adicionarProduto([novoProduto])
        .then(() => {
          setCadastrados(prevCadastrados => [...prevCadastrados, novoProduto]);
          setNome("");
          setQuantidade("");
          setDetalhes("");
          setUnidade("KG");
          setErros({ nome: false, quantidade: false });
        })
        .catch((error) => {
          console.error("Erro ao cadastrar produto", error);
        });
    }
  };

  const excluirProduto = (produtoId, isAdicionado) => {
    if (isAdicionado) {
      setAdicionados(adicionados.filter((produto) => produto.id !== produtoId));
    } else {
      if (window.confirm("Tem certeza que deseja excluir este produto?")) {
        produtoService.excluirProduto(produtoId)
          .then(() => {
            setCadastrados(cadastrados.filter((produto) => produto.id !== produtoId));
          })
          .catch((error) => {
            console.error("Erro ao excluir produto", error);
          });
      }
    }
  };
  
 
  const editarProduto = (produto) => {
   
    if (produto.movimentacao) {
      alert("Este produto não pode ser editado, pois possui movimentação.");
      return;
    }

    console.log("Produto para edição:", produto);  
    console.log("Produto ID:", produto.id); 
    setProdutoEditando(produto);
    setNome(produto.nome);
    setQuantidade(produto.quantidade);
    setUnidade(produto.unidade);
    setDetalhes(produto.detalhes);
  };

  const salvarEdicao = () => {
    if (!nome || !quantidade) {
      setErros({
        nome: !nome,
        quantidade: !quantidade,
      });
      return;
    }

    if (produtoEditando && produtoEditando.movimentacao) {
      alert("Este produto não pode ter a quantidade editada devido a movimentações.");
      return;
    }

    const agora = new Date();
    const deslocamento = agora.getTimezoneOffset() * 60000;
    const dataAtualizada = new Date(agora.getTime() - deslocamento)
      .toISOString()
      .replace('T', ' ')
      .split('.')[0];

    const produtoAtualizado = { ...produtoEditando, nome, quantidade, unidade, detalhes, data: dataAtualizada };

    produtoService.atualizarProduto(produtoEditando.id, produtoAtualizado)
      .then(() => {
        const produtosAtualizados = cadastrados.map((produto) =>
          produto.id === produtoEditando.id
            ? { ...produto, nome, quantidade, unidade, detalhes, data: dataAtualizada }
            : produto
        );
        setCadastrados(produtosAtualizados);
        cancelarEdicao();
      })
      .catch((error) => {
        console.error("Erro ao atualizar produto", error);
      });
  };

  const handleSort = (property) => {
    const novoOrderBy = orderBy === 'asc' ? 'desc' : 'asc';
    setOrderBy(novoOrderBy); 
  
    setCadastrados((prevCadastrados) => {
      const produtosOrdenados = [...prevCadastrados].sort((a, b) => {
        const aValue = a[property] || ''; 
        const bValue = b[property] || '';  
  
        return novoOrderBy === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
  
      return produtosOrdenados;
    });
  };
  
  const cancelarEdicao = () => {
    setProdutoEditando(null);
    setNome("");
    setQuantidade("");
    setDetalhes("");
    setUnidade("KG");
    setErros({ nome: false, quantidade: false });
  };
 

  const produtosFiltrados = cadastrados
  .filter((produto) => {
    const nomeNormalizado = produto.nome.trim().toLowerCase();
    const filtroNormalizado = filtroNome.trim().toLowerCase();
    const regex = new RegExp(filtroNormalizado, 'i');
    return nomeNormalizado.match(regex);
  });

    
  const produtosOrdenados = produtosFiltrados.sort((a, b) => {
    const aValue = a.nome || '';  
    const bValue = b.nome || '';   
 
    return orderBy === 'asc' 
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
  
  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>Gerenciar Produtos</h2>
 
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "50%",
            padding: "20px",
            background: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>
            Cadastrar Produto
          </h3>
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
            disabled={produtoEditando && produtoEditando.movimentacao}
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
            placeholder="Detalhes do Produto"
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
          {produtoEditando ? (
            <div>
              <button
                onClick={salvarEdicao}
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "5px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                Salvar Edição
              </button>
              <button
                onClick={cancelarEdicao}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={adicionarProduto}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cadastrar Produto
            </button>
          )}
        </div>
      </div>

      {/* Filtro de Produtos */}
      <div>
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          style={{
            width: "200px",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        />
      </div>

      {/* Tabela de Produtos */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Produtos Cadastrados</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
            <th onClick={() => handleSort('nome')} style={{ cursor: 'pointer' }}>Produto</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th>Detalhes</th>
              <th>Data Inicial</th>
              <th>Data Edição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosOrdenados.map((produto, index) => (
           <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.unidade}</td>
                <td>{produto.detalhes}</td>
                <td>{new Date(produto.data).toLocaleString()}</td> 
                <td>{ }</td> 
                <td>
                  <button
                    onClick={() => editarProduto(produto)}
                    style={{
                      backgroundColor: "#28a745",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirProduto(produto.id, false)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
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
  );
};

export default GerenciarProdutos;
