import api from './api'; 

class MensalidadeService {
  async getAllMensalidades() {
    try {
      const response = await api.get('/mensalidades');  
      return response.data;
    } catch (error) {
      console.error('Erro ao obter mensalidades:', error);
      throw new Error('Erro ao obter mensalidades');
    }
  }

  async adicionarMensalidade(mensalidade) {
    try {
      console.log('Mensalidade enviada:', mensalidade);

      const response = await api.post('/mensalidades', mensalidade); 

      console.log('Mensalidade cadastrada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar mensalidade:', error);
      throw new Error('Erro ao adicionar mensalidade');
    }
  }

  async atualizarMensalidade(id, mensalidade) {
    if (!id) {
      throw new Error('Mensalidade deve ter um ID para ser atualizada.');
    }

    try {
      const response = await api.put(`/mensalidades/${id}`, mensalidade);  
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar mensalidade:', error);
      throw new Error('Erro ao atualizar mensalidade');
    }
  }

  async excluirMensalidade(id) {
    try {
      const response = await api.delete(`/mensalidades/${id}`);  
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir mensalidade:', error);
      throw new Error('Erro ao excluir mensalidade');
    }
  }
}

export default MensalidadeService;
