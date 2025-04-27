import api from '../services/api';

class AssociadoService {
  async obterTodosAssociados() {
    try{
      const response = await api.get('/associados');
      return response.data;
    } catch(error){
       console.error("Erro ao obter todos os associados:", error);
       throw error;
    }

  }

  async obterAssociadoPorCpf(cpf) {
    try{
        const response = await api.get(`/associados/${cpf}`);
        return response.data;
    } catch(error){
        console.error("Erro ao obter associado por CPF:", error);
        throw error;
    }

  }

  async criarAssociado(associado) {
    try{
        const response = await api.post('/associados', associado);
        return response.data;
    } catch(error){
       console.error("Erro ao criar associado:", error);
       throw error;
    }

  }

  async editarAssociado(cpf, associado) {
   try{
       const response = await api.put(`/associados/${cpf}`, associado);
       return response.data;
   } catch(error){
       console.error("Erro ao editar associado:", error);
       throw error;
   }

  }

  async excluirAssociado(cpf) {
    try{
      const response = await api.delete(`/associados/${cpf}`);
      return response.data;
    } catch(error){
        console.error("Erro ao excluir associado:", error);
        throw error;
    }

  }
}

export default AssociadoService;
