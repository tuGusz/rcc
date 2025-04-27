import api from './api'; 

class ProdutoService {
  async getAllProdutos() {
    try {
      const response = await api.get('/gerenciar-tipos-produtos');   
      return response.data;
    } catch (error) {
      console.error('Erro ao obter os produtos:', error);
      throw new Error('Erro ao obter os produtos');
    }
  }

  // Função para adicionar um novo produto
  async adicionarProduto(produto) {
    try {
      console.log('Produto enviado:', produto);

      const response = await api.post('/gerenciar-tipos-produtos', produto[0]);   

      console.log('Produto com ID retornado:', response.data.id);
      window.location.reload();
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      throw new Error('Erro ao adicionar produto');
    }
  }

  // Função para atualizar um produto
  async atualizarProduto(id, produto) {
    if (!id) {
      throw new Error('Produto deve ter um ID para ser atualizado.');
    }

    try {
      const response = await api.put(`/gerenciar-tipos-produtos/${id}`, produto);  
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw new Error('Erro ao atualizar produto');
    }
  }

  // Função para excluir um produto
  async excluirProduto(id) {
    try {
      const response = await api.delete(`/gerenciar-tipos-produtos/${id}`);  
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      throw new Error('Erro ao excluir produto');
    }
  }
}

export default ProdutoService;
