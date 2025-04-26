import React, { useEffect, useState } from "react";
import ComissaoService from "../services/ComissaoService";
import InputMask from "react-input-mask";

const comissaoService = new ComissaoService();

const Comissao = () => {
  const [comissoes, setComissoes] = useState([]);
  const [novoValor, setNovoValor] = useState('');
  const [novoAssociado, setNovoAssociado] = useState('');
  const [status, setStatus] = useState('pix');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState('');
  const [associados] = useState([
    { id: 1, nome: "Associado 1" },
    { id: 2, nome: "Associado 2" },
    { id: 3, nome: "Associado 3" },
  ]);
  const [modalAberto, setModalAberto] = useState(false);
  const [comissaoParaExcluir, setComissaoParaExcluir] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'data_pagamento',
    direction: 'asc',
  });

  // Carregar comissões do banco de dados
  const carregarComissoes = async () => {
    try {
      const comissoes = await comissaoService.obterTodasComissoes();
      setComissoes(comissoes.rows);
    } catch (error) {
      console.error(error);
    }
  };

  // Função para limpar a formatação do valor e garantir que seja um número
  const limparValor = (valor) => {
    return parseFloat(valor.replace('R$', '').replace('.', '').replace(',', '.')).toFixed(2);
  };

  // Adicionar nova comissão
  const adicionarComissao = async () => {
    if (!novoValor || !novoAssociado) {
      setErrors('Preencha todos os campos.');
      return;
    }

    const valorLimpo = limparValor(novoValor); // Limpa o valor da máscara

    const novaComissao = {
      valor: valorLimpo,
      dataPagamento: new Date().toISOString(),
      status: status,
      idAssociado: parseInt(novoAssociado),
    };

    try {
      await comissaoService.adicionarComissao(novaComissao);
      setMessage('Comissão adicionada com sucesso!');
      setNovoValor('');
      setNovoAssociado('');
      setStatus('pix');
      carregarComissoes();
    } catch (error) {
      setErrors('Erro ao adicionar comissão');
    }
  };

  // Excluir comissão
  const excluirComissao = async () => {
    if (!comissaoParaExcluir) return;

    try {
      await comissaoService.excluirComissao(comissaoParaExcluir.id_comissao);
      setComissoes(comissoes.filter((comissao) => comissao.id_comissao !== comissaoParaExcluir.id_comissao));
      setModalAberto(false);
    } catch (error) {
      setErrors('Erro ao excluir comissão');
    }
  };

  // Abrir modal de confirmação de exclusão
  const abrirModalExcluir = (comissao) => {
    setComissaoParaExcluir(comissao);
    setModalAberto(true);
  };

  // Fechar modal de confirmação de exclusão
  const fecharModalExcluir = () => {
    setComissaoParaExcluir(null);
    setModalAberto(false);
  };

  // Ordenar comissões
  const ordenarComissoes = (comissoes) => {
    const { key, direction } = sortConfig;
    return comissoes.sort((a, b) => {
      if (key === 'valor') {
        return direction === 'asc'
          ? parseFloat(a[key]) - parseFloat(b[key])
          : parseFloat(b[key]) - parseFloat(a[key]);
      } else if (key === 'data_pagamento') {
        return direction === 'asc'
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      } else if (key === 'status') {
        return direction === 'asc'
          ? a[key].toString().localeCompare(b[key].toString())
          : b[key].toString().localeCompare(a[key].toString());
      } else {
        return 0;
      }
    });
  };

  // Alterar ordenação
  const alterarOrdenacao = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    carregarComissoes();
  }, []);

  // Ordenar comissões ao carregar
  const comissoesOrdenadas = ordenarComissoes(comissoes);

  const renderSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '';
  };

  return (
    <div className="comissao-container">
      <h1>Gerenciar Comissões</h1>

      {message && <div className="alert alert-success">{message}</div>}
      {errors && <div className="alert alert-danger">{errors}</div>}

      <div className="form-campanha">
        <div className="form-group">
          <label htmlFor="valor">Valor da Comissão:</label>
          <InputMask
            type="text"
            id="valor"
            mask="R$ 99,99"
            value={novoValor}
            onChange={(e) => setNovoValor(e.target.value)}
            placeholder="R$ 0,00"
          />
        </div>

        <div className="form-group">
          <label htmlFor="associado">Associado:</label>
          <select
            id="associado"
            value={novoAssociado}
            onChange={(e) => setNovoAssociado(e.target.value)}
          >
            <option value="">Selecione o Associado</option>
            {associados.map((associado) => (
              <option key={associado.id} value={associado.id}>
                {associado.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pix">Pix</option>
            <option value="credito">Crédito</option>
          </select>
        </div>

        <button onClick={adicionarComissao} className="btn-cadastrar">
          Adicionar Comissão
        </button>
      </div>

      <h2>Comissões Registradas</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => alterarOrdenacao('id_comissao')}>
              ID {renderSortArrow('id_comissao')}
            </th>
            <th onClick={() => alterarOrdenacao('valor')}>
              Valor {renderSortArrow('valor')}
            </th>
            <th onClick={() => alterarOrdenacao('data_pagamento')}>
              Data de Pagamento {renderSortArrow('data_pagamento')}
            </th>
            <th onClick={() => alterarOrdenacao('status')}>
              Tipo Pagamento {renderSortArrow('status')}
            </th>
            <th>Associado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {comissoesOrdenadas.map((comissao) => (
            <tr key={comissao.id_comissao}>
              <td>{comissao.id_comissao}</td>
              <td>{`R$ ${parseFloat(comissao.valor).toFixed(2).replace('.', ',')}`}</td>
              <td>{new Date(comissao.data_pagamento).toLocaleDateString()}</td>
              <td>{comissao.status}</td>
              <td>{associados.find(a => a.id === comissao.id_associado)?.nome}</td>
              <td>
                <button onClick={() => abrirModalExcluir(comissao)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAberto && (
        <div className="modal-global">
          <div className="modal-content">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir a comissão de <strong>{comissaoParaExcluir?.id_comissao}</strong>?</p>
            <button onClick={excluirComissao} className="btn-confirmar">Sim</button>
            <button onClick={fecharModalExcluir} className="btn-cancelar">Não</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comissao;
