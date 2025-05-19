import axios from 'axios';

const API_URL = 'http://localhost:3002'; // ajuste para o endpoint correto

class EstoqueService {
  constructor(token) {
    this.token = token;
    this.headers = {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    };
  }

  // Registrar um novo item no estoque
  async registrarItem(item) {
    try {
      const response = await axios.post(`${API_URL}/estoque`, item, this.headers);
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar item no estoque:', error);
      throw error;
    }
  }

  // Listar todos os itens do estoque
  async listarEstoque() {
    try {
      const response = await axios.get(`${API_URL}/estoque`, this.headers);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar estoque:', error);
      throw error;
    }
  }

  // Buscar um item por ID
  async buscarItemPorId(id) {
    try {
      const response = await axios.get(`${API_URL}/estoque/${id}`, this.headers);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar item com ID ${id}:`, error);
      throw error;
    }
  }

  // Atualizar um item
  async atualizarItem(id, item) {
    try {
      const response = await axios.put(`${API_URL}/estoque/${id}`, item, this.headers);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar item com ID ${id}:`, error);
      throw error;
    }
  }

  // Deletar um item
  async deletarItem(id) {
    try {
      const response = await axios.delete(`${API_URL}/estoque/${id}`, this.headers);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar item com ID ${id}:`, error);
      throw error;
    }
  }
}

export default EstoqueService;