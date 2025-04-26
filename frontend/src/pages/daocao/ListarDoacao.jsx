// src/components/ListaDoacoes.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api'; 

const ListaDoacoes = () => {
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar as doações
  const fetchDoacoes = async () => {
    try {
      const response = await api.get('/doacoes');
      setDoacoes(response.data);
    } catch (err) {
      console.error("Erro ao carregar as doações:", err);
      setError('Erro ao carregar as doações. Verifique o console para mais detalhes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoacoes();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="doacoes-container">
      <h1>Lista de Doações</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Doador</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Valor/Qunatidade</th>
            <th>Data de Entrega</th>
            <th>Local de Entrega</th>
          </tr>
        </thead>
        <tbody>
          {doacoes.map((doacao) => (
            <tr key={doacao.id}>
              <td>{doacao.id}</td>
              <td>{doacao.nome_doador}</td>
              <td>{doacao.email}</td>
              <td>{doacao.tipo}</td>
              <td>{doacao.descricao}</td>
              <td>{doacao.valor}</td>
              <td>{new Date(doacao.data_entrega).toLocaleDateString("pt-BR")}</td>
              <td>{doacao.local_entrega}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaDoacoes;
