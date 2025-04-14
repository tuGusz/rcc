import React, { useState, useEffect } from 'react';
import './ListagemCampanha.css';
import CampanhaService from '../services/CampanhaService.js';

const campanhaService = new CampanhaService();

const formatarData = (dataISO) => {
  if (!dataISO) {   
    return 'Não há data para término para esta campanha';  
  }
  
  const data = new Date(dataISO);
  if (data instanceof Date && !isNaN(data)) {
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(data);
  }
  return '';
};

const formatarDataParaInput = (dataISO) => {
  const data = new Date(dataISO);
  const ano = data.getFullYear();
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const dia = data.getDate().toString().padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

export default function ListagemCampanha() {
  const [campanhas, setCampanhas] = useState([]);
  const [erro, setErro] = useState(null);
  const [campanhaEditando, setCampanhaEditando] = useState(null);
  const [erroData, setErroData] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [campanhaParaExcluir, setCampanhaParaExcluir] = useState(null);

  const carregarCampanhas = async () => {
    try {
      const dados = await campanhaService.obterTodasCampanhas();
      setCampanhas(dados.rows || []);
    } catch (e) {
      setErro('Erro ao carregar campanhas. Verifique sua conexão ou a API.');
    }
  };

  useEffect(() => {
    carregarCampanhas();
  }, []);

  const excluirCampanha = async () => {
    if (!campanhaParaExcluir) return;

    try {
      await campanhaService.excluirCampanha(campanhaParaExcluir.c_id);
      setCampanhas(campanhas.filter((campanha) => campanha.c_id !== campanhaParaExcluir.c_id));
      setModalAberto(false);
    } catch (e) {
      setErro('Erro ao excluir campanha. Verifique sua conexão ou a API.');
    }
  };

  const abrirModalExcluir = (campanha) => {
    setCampanhaParaExcluir(campanha);
    setModalAberto(true);
  };

  const fecharModalExcluir = () => {
    setCampanhaParaExcluir(null);
    setModalAberto(false);
  };

  const iniciarEdicao = (campanha) => {
    setCampanhaEditando({
      ...campanha,
      c_data_inicio: formatarDataParaInput(campanha.c_data_inicio),
      c_data_fim: formatarDataParaInput(campanha.c_data_fim),
    });
  };

  const validarDatas = () => {
    const dataInicio = new Date(campanhaEditando.c_data_inicio);
    const dataFim = new Date(campanhaEditando.c_data_fim);
    const dataAtual = new Date();

    if (dataInicio < dataAtual) {
      setErroData('A data de início não pode ser anterior a hoje.');
      return false;
    }

    if (dataFim < dataInicio) {
      setErroData('A data final não pode ser anterior à data de início.');
      return false;
    }

    setErroData(null);
    return true;
  };

  const salvarEdicao = async () => {
    if (!validarDatas()) return;

    const campanhaAtualizada = {
      id: campanhaEditando.c_id,
      nome: campanhaEditando.c_nome,
      local: campanhaEditando.c_local,
      descricao: campanhaEditando.c_descricao,
      dataInicio: campanhaEditando.c_data_inicio,
      dataFim: campanhaEditando.c_data_fim,
    };

    try {
      await campanhaService.editarCampanha(campanhaEditando.c_id, campanhaAtualizada);
      carregarCampanhas();
      setCampanhaEditando(null);
    } catch (error) {
      console.error('Erro ao atualizar campanha:', error);
    }
  };

  const cancelarEdicao = () => {
    setCampanhaEditando(null);
  };

  const ordenarPorNome = () => {
    const campanhasOrdenadas = [...campanhas].sort((a, b) => a.c_nome.localeCompare(b.c_nome));
    setCampanhas(campanhasOrdenadas);
  };

  const ordenarPorData = () => {
    const campanhasOrdenadas = [...campanhas].sort(
      (a, b) => new Date(a.c_data_inicio) - new Date(b.c_data_inicio)
    );
    setCampanhas(campanhasOrdenadas);
  };

  return (
    <div className="listagem-campanha-container">
      <h1>Lista de Campanhas</h1>
      {erro && <div className="erro-global">{erro}</div>}
      {erroData && <div className="erro-global">{erroData}</div>}

      <div className="ordenar-botoes">
        <button onClick={ordenarPorNome} className="ordenar-botao">Ordenar por Nome</button>
        <button onClick={ordenarPorData} className="ordenar-botao">Ordenar por Data Inicial</button>
      </div>

      {campanhas.length === 0 ? (
        <p>Não há campanhas cadastradas.</p>
      ) : (
        <table className="table-campanhas">
          <thead>
            <tr>
              <th>Campanha</th>
              <th>Descrição</th>
              <th>Data de Início</th>
              <th>Data de Fim</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {campanhas.map((campanha) => (
              <tr key={campanha.c_id}>
                {campanhaEditando?.c_id === campanha.c_id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      salvarEdicao();
                    }}
                    className="form-edicao"
                  >
                    <td>
                      <input
                        type="text"
                        value={campanhaEditando.c_nome}
                        onChange={(e) => setCampanhaEditando({ ...campanhaEditando, c_nome: e.target.value })}
                        required
                      />
                    </td>
                    <td>
                      <textarea
                        value={campanhaEditando.c_descricao}
                        onChange={(e) => setCampanhaEditando({ ...campanhaEditando, c_descricao: e.target.value })}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={campanhaEditando.c_data_inicio}
                        onChange={(e) => setCampanhaEditando({ ...campanhaEditando, c_data_inicio: e.target.value })}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={formatarData(campanhaEditando.c_data_fim)}
                        onChange={(e) => setCampanhaEditando({ ...campanhaEditando, c_data_fim: e.target.value })}
                        required
                      />
                    </td>
                    <td>
                      <button type="submit">Salvar</button>
                      <button type="button" onClick={cancelarEdicao}>Cancelar</button>
                    </td>
                  </form>
                ) : (
                  <>
                    <td>{campanha.c_nome}</td>
                    <td>{campanha.c_descricao}</td>
                    <td>{formatarData(campanha.c_data_inicio)}</td>
                    <td>{formatarData(campanha.c_data_fim)}</td>
                    <td>
                      <button onClick={() => iniciarEdicao(campanha)} className="listagem-campanha-btn-editar">Editar</button>
                      <button onClick={() => abrirModalExcluir(campanha)} className="listagem-campanha-btn-excluir">Excluir</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalAberto && (
        <div className="modal-global">
          <div className="modal-content">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir a campanha <strong>{campanhaParaExcluir?.c_nome}</strong>?</p>
            <button onClick={excluirCampanha} className="btn-confirmar">Sim</button>
            <button onClick={fecharModalExcluir} className="btn-cancelar">Não</button>
          </div>
        </div>
      )}
    </div>
  );
}
