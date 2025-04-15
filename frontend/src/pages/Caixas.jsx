import React, { useEffect, useState } from "react";
import CaixaService from "../services/CaixaService";
import './Caixas.css';
import toast, { Toaster } from "react-hot-toast";

const caixaService = new CaixaService();

const Caixas = () => {
  const [caixasAbertos, setCaixasAbertos] = useState([]);
  const [caixasFechados, setCaixasFechados] = useState([]);
  const [modalTipo, setModalTipo] = useState(null); // 'criarCaixa' ou 'verTransacoes'
  const [valorInicial, setValorInicial] = useState("");
  const [dataAbertura, setDataAbertura] = useState("");
  const [idGestao, setIdGestao] = useState(1);
  const [valorMovimentacao, setValorMovimentacao] = useState("");
  const [idCaixaMovimentar, setIdCaixaMovimentar] = useState(null);
  const [fecharModalVisible, setFecharModalVisible] = useState(false);
  const [idCaixaFechar, setIdCaixaFechar] = useState(null);

  // Para armazenar as transações e o valor de filtro
  const [transacoes, setTransacoes] = useState([]);
  const [filtroValor, setFiltroValor] = useState("");

  const carregarCaixas = async () => {
    try {
      const abertos = await caixaService.obterCaixasAbertos();
      const fechados = await caixaService.obterCaixasFechados();
      console.log("Caixas Abertos:", abertos);
      console.log("Caixas Fechados:", fechados);
      setCaixasAbertos(abertos);
      setCaixasFechados(fechados);
    } catch (err) {
      toast.error("Erro ao carregar caixas.");
    }
  };

  const carregarTransacoes = async (idCaixa) => {
    try {
      const transacoes = await caixaService.obterMovimentacoes(idCaixa);
      setTransacoes(transacoes);
    } catch (err) {
      toast.error("Erro ao carregar transações.");
    }
  };

  useEffect(() => {
    carregarCaixas();
  }, []);

  const abrirCaixa = async () => {
    if (!valorInicial || isNaN(valorInicial) || !dataAbertura) {
      toast.error("Preencha todos os campos corretamente.");
      return;
    }

    try {
      await caixaService.abrirCaixa({
        valorInicial: parseFloat(valorInicial),
        dataAbertura,
        idGestao
      });
      toast.success("Caixa aberto com sucesso!");
      carregarCaixas();
      setModalTipo(null); // Fechar o modal de criação
    } catch (err) {
      toast.error("Erro ao abrir o caixa.");
    }
  };

  const movimentarValor = async (idCaixa, tipo) => {
    if (!valorMovimentacao || isNaN(valorMovimentacao)) {
      toast.error("Valor inválido.");
      return;
    }

    try {
      await caixaService.movimentarCaixa(idCaixa, parseFloat(valorMovimentacao), tipo);
      toast.success("Movimentação realizada com sucesso.");
      carregarCaixas();
      setValorMovimentacao("");
    } catch (err) {
      toast.error("Erro ao movimentar valor no caixa.");
    }
  };

  // Função para fechar o caixa
  const confirmarFechamento = async () => {
    try {
      const caixa = caixasAbertos.find(c => c.id_caixa === idCaixaFechar);
      if (!caixa) {
        toast.error("Caixa não encontrado.");
        return;
      }

      const valorFinal = parseFloat(caixa.valor_final);
      await caixaService.fecharCaixa(idCaixaFechar, valorFinal);
      toast.success("Caixa fechado com sucesso.");
      setFecharModalVisible(false);
      setIdCaixaFechar(null);
      carregarCaixas();
    } catch (err) {
      toast.error("Erro ao fechar o caixa.");
    }
  };

  // Função para filtrar as transações pelo valor
  const filtrarTransacoes = () => {
    return transacoes.filter(transacao => 
      transacao.valor.toString().includes(filtroValor)
    );
  };

  return (
    <div className="caixa-container">
      <Toaster position="top-right" />

      <h1>Gerenciar Caixas</h1>

      <button className="abrir-btn" onClick={() => setModalTipo('criarCaixa')}>Abrir Novo Caixa</button>

      {/* Modal para abrir caixa */}
      {modalTipo === 'criarCaixa' && (
        <div className="modal-overlay show">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Abrir Novo Caixa</h5>
              <button onClick={() => setModalTipo(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Valor Inicial:</label>
                  <input type="number" value={valorInicial} onChange={(e) => setValorInicial(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Data de Abertura:</label>
                  <input type="datetime-local" value={dataAbertura} onChange={(e) => setDataAbertura(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>ID Gestão:</label>
                  <input type="number" value={idGestao} onChange={(e) => setIdGestao(e.target.value)} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="cancel" onClick={() => setModalTipo(null)}>Cancelar</button>
              <button onClick={abrirCaixa}>Abrir Caixa</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para listar transações */}
      {modalTipo === 'verTransacoes' && (
        <div className="modal-overlay show">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Transações do Caixa</h5>
              <button onClick={() => setModalTipo(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <input 
                type="text" 
                placeholder="Filtrar por valor" 
                value={filtroValor}
                onChange={(e) => setFiltroValor(e.target.value)} 
              />
              <table>
                <thead>
                  <tr>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrarTransacoes().map((transacao, index) => (
                    <tr key={index}> 
                      <td>R$ {parseFloat(transacao.valor).toFixed(2).replace(".", ",")}</td>
                      <td>{transacao.tipo}</td>
                      <td>{new Date(transacao.data_movimentacao).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button className="cancel" onClick={() => setModalTipo(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* Caixas Abertos */}
      <section>
        <h2>Caixas Abertos</h2>
        <table>
          <thead>
            <tr>
              <th>Gestão</th>
              <th>Valor Inicial</th>
              <th>Valor Final</th>
              <th>Status</th>
              <th>Data Abertura</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {caixasAbertos.length > 0 ? (
              caixasAbertos.map(caixa => (
                <tr key={caixa.id_caixa}>
                  <td>{caixa.id_gestao}</td>
                  <td>R$ {parseFloat(caixa.valor_inicial).toFixed(2).replace(".", ",")}</td>
                  <td>R$ {parseFloat(caixa.valor_final).toFixed(2).replace(".", ",")}</td>
                  <td>{caixa.status}</td>
                  <td>{new Date(caixa.data_abertura).toLocaleDateString()}</td>
                  <td className="acoes">
                    <button onClick={() => {
                      carregarTransacoes(caixa.id_caixa);
                      setModalTipo('verTransacoes');
                    }}>Ver Transações</button>
                    <input
                      type="number"
                      placeholder="Valor"
                      value={idCaixaMovimentar === caixa.id_caixa ? valorMovimentacao : ""}
                      onChange={(e) => {
                        setIdCaixaMovimentar(caixa.id_caixa);
                        setValorMovimentacao(e.target.value);
                      }}
                      className="valor-input"
                    />
                    <button className="add-btn" onClick={() => movimentarValor(caixa.id_caixa, "adicionar")}>+</button>
                    <button className="remove-btn" onClick={() => movimentarValor(caixa.id_caixa, "retirar")}>-</button>
                    <button className="fechar-btn" onClick={() => {
                      setIdCaixaFechar(caixa.id_caixa);
                      setFecharModalVisible(true);
                    }}>Fechar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6">Nenhum caixa aberto.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Caixas Fechados */}
      <section>
        <h2>Caixas Fechados</h2>
        <table className="disabled">
          <thead>
            <tr>
              <th>Gestão</th>
              <th>Valor Inicial</th>
              <th>Valor Final</th>
              <th>Status</th>
              <th>Data Abertura</th>
              <th>Data Fechamento</th>
            </tr>
          </thead>
          <tbody>
            {caixasFechados.length > 0 ? (
              caixasFechados.map(caixa => (
                <tr key={caixa.id_caixa}>
                  <td>{caixa.id_gestao}</td>
                  <td>R$ {parseFloat(caixa.valor_inicial).toFixed(2).replace(".", ",")}</td>
                  <td>R$ {parseFloat(caixa.valor_final).toFixed(2).replace(".", ",")}</td>
                  <td>{caixa.status}</td>
                  <td>{new Date(caixa.data_abertura).toLocaleDateString()}</td>
                  <td>{new Date(caixa.data_fechamento).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5">Nenhum caixa fechado.</td></tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Modal de Fechamento de Caixa */}
      {fecharModalVisible && (
        <div className="modal-overlay show">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Fechar Caixa</h5>
              <button onClick={() => setFecharModalVisible(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p>Você está prestes a fechar o caixa. Deseja continuar?</p>
              <button className="cancel" onClick={() => setFecharModalVisible(false)}>Cancelar</button>
              <button onClick={confirmarFechamento}>Fechar Caixa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Caixas;
