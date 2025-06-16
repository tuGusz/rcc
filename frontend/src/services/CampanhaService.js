import api from '../services/api';  

class CampanhaService {
  // Obter todas as campanhas
  async obterTodasCampanhas() {
    const response = await api.get('/campanhas');
    return response.data;
  }
  // Excluir uma campanha pelo ID
  async excluirCampanha(id) {
    const response = await api.delete(`/campanha/${id}`);
    return response.data;
  }
  // Adicionar uma nova campanha
  async adicionarCampanha(campanha) {
    const response = await api.post('/campanha', campanha);
    return response.data;
  }
  // Editar uma campanha existente
  async editarCampanha(id, campanha) {
    const response = await api.put(`/campanha/${id}`, campanha);
    return response.data;
  }
}

export default CampanhaService;
