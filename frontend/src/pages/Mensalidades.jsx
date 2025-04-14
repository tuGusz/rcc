import React, { useState, useEffect } from 'react';
import MensalidadeService from '../services/Mensalidades.js';  

const GerenciarMensalidades = () => {
  const [mensalidades, setMensalidades] = useState([]);
  const [mensalidadesFiltradas, setMensalidadesFiltradas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [editando, setEditando] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  useEffect(() => {
    const mensalidadeService = new MensalidadeService();
    const carregarMensalidades = async () => {
      try {
        const dados = await mensalidadeService.getAllMensalidades();
        
        if (dados && Array.isArray(dados.rows)) {
          setMensalidades(dados.rows);
          setMensalidadesFiltradas(dados.rows);
        } else {
          console.error("A resposta não contém 'rows' como um array:", dados);
        }
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      }
    };
    carregarMensalidades();
  }, []); 

  useEffect(() => {
    const mensalidadesFiltradas = mensalidades.filter(mensalidade => 
      mensalidade.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mensalidade.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMensalidadesFiltradas(mensalidadesFiltradas);
  }, [searchTerm, mensalidades]);

  const determinarStatus = (mensalidade) => {
    const hoje = new Date();
    const vencimento = new Date(mensalidade.dataVencimento);
  
    if (mensalidade.status === 'Pago') return 'Pago';
    if (vencimento < hoje) return 'Atrasado';
    return 'Pendente';
  };

  const validarValor = (valor) => {
    const valorConvertido = valor.replace(',', '.');
    if (isNaN(valorConvertido) || parseFloat(valorConvertido) < 0) {
      alert('Por favor, insira um valor válido (apenas números e sem negativos).');
      return false;
    }
    return true;
  };

  const validarData = (data) => {
    const regexData = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!regexData.test(data)) {
      alert('Por favor, insira uma data válida');
      return false;
    }

    const partesData = data.split('-');
    const ano = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10) - 1; 
    const dia = parseInt(partesData[2], 10);

    const dataObj = new Date(ano, mes, dia);

    if (dataObj.getFullYear() !== ano || dataObj.getMonth() !== mes || dataObj.getDate() !== dia) {
      alert('A data inserida não existe no calendário.');
      return false;
    }

    return true;
  };

  const baixarPagamento = async (id) => {
    try {
      const mensalidadeParaAtualizar = mensalidades.find((mensalidade) => mensalidade.id === id);
  
      if (!mensalidadeParaAtualizar) {
        console.error('Mensalidade não encontrada');
        return;
      }
  
      const mensalidadeAtualizada = {
        ...mensalidadeParaAtualizar,
        status: 'Pago',
      };
  
      const mensalidadeService = new MensalidadeService();
      await mensalidadeService.atualizarMensalidade(id, mensalidadeAtualizada);
  
      setMensalidades((prevMensalidades) =>
        prevMensalidades.map((mensalidade) =>
          mensalidade.id === id ? { ...mensalidade, status: 'Pago' } : mensalidade
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar o status para Pago:', error);
    }
  };

  const salvarMensalidade = async () => {
    if (!categoria || !valor || !dataVencimento) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    const valorAjustado = valor.replace(',', '.');
  
    if (!validarValor(valorAjustado)) return;
    if (!validarData(dataVencimento)) return;
  
    const novaMensalidade = {
      categoria,
      descricao: descricao || "Sem Descrição",
      valor: parseFloat(valorAjustado),
      dataVencimento,
      status,
    };
  
    try {
      const mensalidadeService = new MensalidadeService();

      if (editando) {
        await mensalidadeService.atualizarMensalidade(editando.id, novaMensalidade);
        setMensalidades(mensalidades.map((mensalidade) => mensalidade.id === editando.id ? { ...mensalidade, ...novaMensalidade } : mensalidade));
      } else {
        await mensalidadeService.adicionarMensalidade(novaMensalidade);
      }

      const dados = await mensalidadeService.getAllMensalidades();
      if (dados && Array.isArray(dados.rows)) {
        setMensalidades(dados.rows);
        setMensalidadesFiltradas(dados.rows);
      } else {
        console.error("A resposta não contém 'rows' como um array:", dados);
      }

      resetarFormulario();
    } catch (error) {
      console.error('Erro ao salvar mensalidade:', error);
    }
  };

  const excluirMensalidade = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta mensalidade?')) {
      try {
        const mensalidadeService = new MensalidadeService(); 
        await mensalidadeService.excluirMensalidade(id);

        const dados = await mensalidadeService.getAllMensalidades();
        if (dados && Array.isArray(dados.rows)) {
          setMensalidades(dados.rows);
          setMensalidadesFiltradas(dados.rows);
        } else {
          console.error("A resposta não contém 'rows' como um array:", dados);
        }
      } catch (error) {
        console.error('Erro ao excluir mensalidade:', error);
      }
    }
  };

  const editarMensalidade = (mensalidade) => {
    setEditando(mensalidade);
    setDescricao(mensalidade.descricao);
    setCategoria(mensalidade.categoria);
    setValor(mensalidade.valor.toString().replace('.', ',')); 
  
    const dataFormatada = new Date(mensalidade.dataVencimento).toISOString().split('T')[0];
    setDataVencimento(dataFormatada);
  
    setStatus(mensalidade.status);
  };
  
  const resetarFormulario = () => {
    setDescricao('');
    setCategoria('');
    setValor('');
    setDataVencimento('');
    setStatus('Pendente');
    setEditando(null);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedMensalidades = [...mensalidadesFiltradas].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setMensalidadesFiltradas(sortedMensalidades);
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', textAlign: 'center' }}>
      <h2>Cadastrar Despesas</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por categoria ou descrição"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ margin: '5px', padding: '10px', width: '300px' }}
        />
        {/* Formulário */}
        <input
          type="text"
          placeholder="Categoria *"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={{ margin: '5px', padding: '10px', width: '200px' }}
        />
        <input
          type="text"
          placeholder="Descrição (Opcional)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{ margin: '5px', padding: '10px', width: '200px' }}
        />
        <input
          type="text"
          placeholder="Valor *"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          style={{ margin: '5px', padding: '10px', width: '200px' }}
        />
        <input
          type="date"
          value={dataVencimento}
          onChange={(e) => setDataVencimento(e.target.value)}
          style={{ margin: '5px', padding: '10px', width: '200px' }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ margin: '5px', padding: '10px', width: '200px' }}
        >
          <option value="Pendente">Pendente</option>
          <option value="Atrasado">Atrasado</option>
          <option value="Pago">Pago</option>
        </select>
        <button onClick={salvarMensalidade} style={{ margin: '5px', padding: '10px' }}>
          {editando ? 'Salvar Alterações' : 'Adicionar'}
        </button>
        {editando && (
          <button onClick={resetarFormulario} style={{ margin: '5px', padding: '10px' }}>
            Cancelar
          </button>
        )}
      </div>

      <table border="1" style={{ width: '100%', marginTop: '20px', textAlign: 'left' }}>
        <thead>
          <tr>
            <th onClick={() => handleSort('categoria')}>Categoria</th>
            <th onClick={() => handleSort('descricao')}>Descrição</th>
            <th onClick={() => handleSort('valor')}>Valor</th>
            <th onClick={() => handleSort('dataVencimento')}>Data de Vencimento</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {mensalidadesFiltradas.map((mensalidade) => (
            <tr key={mensalidade.id}>
              <td>{mensalidade.categoria || 'Sem categoria'}</td>
              <td>{mensalidade.descricao || 'Sem descrição'}</td>
              <td>R$ {mensalidade.valor !== undefined && mensalidade.valor !== null ? parseFloat(mensalidade.valor).toFixed(2).replace('.', ',') : '0,00'}</td>
              <td>{ new Date(mensalidade.dataVencimento).toLocaleDateString('pt-BR') || 'Sem data'}</td>
              <td>{determinarStatus(mensalidade)}</td>
              <td>
                <button
                  onClick={() => editarMensalidade(mensalidade)}
                  style={{ marginRight: '5px', padding: '5px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => baixarPagamento(mensalidade.id)}
                  style={{ marginRight: '5px', padding: '5px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Pago
                </button>
                <button
                  onClick={() => excluirMensalidade(mensalidade.id)}
                  style={{ padding: '5px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GerenciarMensalidades;
