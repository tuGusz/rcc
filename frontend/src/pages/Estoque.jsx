import React, { useEffect, useState } from "react";
import EstoqueService from "../services/EstoqueService";
import './Caixas.css';
import toast, { Toaster } from "react-hot-toast";

// Lista fictícia de doações
const doacoesFicticias = [
  { id: 1, nome: "Doação da Prefeitura - 10/05/2025" },
  { id: 2, nome: "Campanha de Inverno - 15/05/2025" },
  { id: 3, nome: "Doação da ONG Vida - 17/05/2025" },
];

const Estoque = () => {
  const [produtos, setProdutos] = useState([]);
  const [modalTipo, setModalTipo] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [nomeItem, setNomeItem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [idDoacao, setIdDoacao] = useState("");

  const token = localStorage.getItem("token");
  const estoqueService = new EstoqueService(token);

  const carregarProdutos = async () => {
    try {
      const lista = await estoqueService.listarEstoque();
      setProdutos(lista);
    } catch (err) {
      toast.error("Erro ao carregar produtos do estoque.");
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const abrirModalAdicionar = () => {
    setProdutoSelecionado(null);
    setNomeItem("");
    setDescricao("");
    setQuantidade("");
    setIdDoacao("");
    setModalTipo("adicionarProduto");
  };

  const abrirModalEditar = (produto) => {
    setProdutoSelecionado(produto);
    setNomeItem(produto.nome_item);
    setDescricao(produto.descricao);
    setQuantidade(produto.quantidade);
    setIdDoacao(produto.id_doacao || "");
    setModalTipo("editarProduto");
  };

  const adicionarProduto = async () => {
    if (!nomeItem || !quantidade || isNaN(quantidade) || !idDoacao) {
      toast.error("Preencha todos os campos corretamente.");
      return;
    }
    try {
      await estoqueService.registrarItem({
        id_doacao: parseInt(idDoacao),
        nome_item: nomeItem,
        descricao,
        quantidade: parseInt(quantidade),
      });
      toast.success("Produto adicionado com sucesso!");
      carregarProdutos();
      setModalTipo(null);
    } catch (err) {
      toast.error("Erro ao adicionar produto.");
    }
  };

  const editarProduto = async () => {
    if (!nomeItem || !quantidade || isNaN(quantidade) || !idDoacao) {
      toast.error("Preencha todos os campos corretamente.");
      return;
    }
    try {
      await estoqueService.atualizarItem(produtoSelecionado.id, {
        id_doacao: parseInt(idDoacao),
        nome_item: nomeItem,
        descricao,
        quantidade: parseInt(quantidade),
      });
      toast.success("Produto atualizado com sucesso!");
      carregarProdutos();
      setModalTipo(null);
    } catch (err) {
      toast.error("Erro ao atualizar produto.");
    }
  };

  const excluirProduto = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await estoqueService.deletarItem(id);
      toast.success("Produto excluído com sucesso!");
      carregarProdutos();
    } catch (err) {
      toast.error("Erro ao excluir produto.");
    }
  };

  return (
    <div className="caixa-container">
      <Toaster position="top-right" />
      <h1>Estoque</h1>

      <button className="abrir-btn" onClick={abrirModalAdicionar}>Adicionar Produto</button>

      {modalTipo && (
        <div className="modal-overlay show">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{modalTipo === "adicionarProduto" ? "Adicionar Produto" : "Editar Produto"}</h5>
              <button onClick={() => setModalTipo(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Nome do Item:</label>
                  <input
                    type="text"
                    value={nomeItem}
                    onChange={(e) => setNomeItem(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Descrição:</label>
                  <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Quantidade:</label>
                  <input
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Doação:</label>
                  <select value={idDoacao} onChange={(e) => setIdDoacao(e.target.value)}>
                    <option value="">Selecione uma doação</option>
                    {doacoesFicticias.map((doacao) => (
                      <option key={doacao.id} value={doacao.id}>
                        {doacao.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="cancel" onClick={() => setModalTipo(null)}>Cancelar</button>
              {modalTipo === "adicionarProduto" ? (
                <button onClick={adicionarProduto}>Adicionar</button>
              ) : (
                <button onClick={editarProduto}>Salvar</button>
              )}
            </div>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Nome do Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Data de Entrada</th>
            <th>Doação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome_item}</td>
                <td>{produto.descricao}</td>
                <td>{produto.quantidade}</td>
                <td>{new Date(produto.data_entrada).toLocaleDateString()}</td>
                <td>
                  {
                    doacoesFicticias.find((d) => d.id === produto.id_doacao)?.nome || "ID " + produto.id_doacao
                  }
                </td>
                <td className="acoes">
                  <button onClick={() => abrirModalEditar(produto)}>Editar</button>
                  <button className="remove-btn" onClick={() => excluirProduto(produto.id)}>Excluir</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum produto no estoque.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Estoque;
