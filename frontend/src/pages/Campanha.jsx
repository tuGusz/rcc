import React, { useState, useContext } from 'react';
import { MenuContext } from "../context/MenuContext";
import './Campanha.css';
import CampanhaService from '../services/CampanhaService';
// Remova o 'new' aqui
const campanhaService = new CampanhaService(); // Importe diretamente a instância exportada

export default function Campanha() {
  const { isMenuOpen } = useContext(MenuContext);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    local: '',
    dataInicio: '',
    dataFim: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validate = () => {
    const errors = {};
    const now = new Date();

    // Nome
    if (formData.nome.trim().length < 3) {
      errors.nome = 'O nome deve ter pelo menos 3 caracteres.';
    }

    // Local
    if (formData.local.trim().length < 3) {
      errors.local = 'O local deve ter pelo menos 3 caracteres.';
    }

    // Descrição
    if (formData.descricao.trim().length === 0) {
      errors.descricao = 'A descrição não pode estar vazia.';
    }

    // Data de início
    if (!formData.dataInicio) {
      errors.dataInicio = 'A data de início é obrigatória.';
    } else if (new Date(formData.dataInicio) < now.setHours(0, 0, 0, 0)) {
      errors.dataInicio = 'A data de início não pode estar no passado.';
    }

    // Data de fim
    if (formData.dataFim && formData.dataInicio) {
      if (new Date(formData.dataFim) < new Date(formData.dataInicio)) {
        errors.dataFim = 'A data de término deve ser posterior à data de início.';
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      setMessage('');

      // Preparando dados para envio à API
      const campanha = {
        nome: formData.nome,
        local: formData.local,
        descricao: formData.descricao,
        dataInicio: formData.dataInicio,
        dataFim: formData.dataFim || null,
      };

      try {
        // Use campanhaService diretamente
        const response = await campanhaService.adicionarCampanha(campanha);

        if (response) {
          setMessage('Campanha cadastrada com sucesso!');
          setFormData({
            nome: '',
            local: '',
            descricao: '',
            dataInicio: '',
            dataFim: '',
          });
        }
      } catch (error) {
        setMessage('Erro ao cadastrar a campanha.');
      } finally {
        setLoading(false);
      }
    } else {
      setMessage('Existem erros no formulário. Corrija-os antes de continuar.');
    }
  };

  return (
    <div style={{ 
      padding: "20px",
      marginLeft: isMenuOpen ? "250px" : "0px",
      transition: "margin-left 0.3s ease"
    }}>
    <div className="campanha-container">
      <h1>Cadastro de Campanha</h1>
      <form onSubmit={handleSubmit} className="form-campanha">
        <div className="form-group">
          <label htmlFor="nome">Nome da Campanha:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          {errors.nome && <span className="error">{errors.nome}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            maxLength="200"
            required
          ></textarea>
          {errors.descricao && <span className="error">{errors.descricao}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="local">Local:</label>
          <input
            type="text"
            id="local"
            name="local"
            value={formData.local}
            onChange={handleChange}
            required
          />
          {errors.local && <span className="error">{errors.local}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="dataInicio">Data de Início:</label>
          <input
            type="date"
            id="dataInicio"
            name="dataInicio"
            value={formData.dataInicio}
            onChange={handleChange}
            required
          />
          {errors.dataInicio && <span className="error">{errors.dataInicio}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="dataFim">Data de Finalização (Opcional):</label>
          <input
            type="date"
            id="dataFim"
            name="dataFim"
            value={formData.dataFim}
            onChange={handleChange}
          />
          {errors.dataFim && <span className="error">{errors.dataFim}</span>}
        </div>
        <button type="submit" className="btn-cadastrar" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar Campanha'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
    </div>
  );
}
