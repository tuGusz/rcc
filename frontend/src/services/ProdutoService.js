const API_BASE_URL = "http://localhost:3002";

class ProdutoService {
  async getAllProdutos() {
    const response = await fetch(`${API_BASE_URL}/gerenciar-tipos-produtos`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao obter os produtos');
    }

    return await response.json();
  }
  
  async adicionarProduto(produto) {
    try {
      console.log('Produto enviado:', produto);
  
      const response = await fetch(`${API_BASE_URL}/gerenciar-tipos-produtos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto[0]),  
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Erro ao adicionar produto:', errorData);
        throw new Error('Erro ao adicionar produto');
      }
  
      const produtoCadastrado = await response.json(); 
      console.log('Produto com ID retornado:', produtoCadastrado.id);
      window.location.reload();
      return produtoCadastrado;
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }
  
  
  async atualizarProduto(id, produto) {
    if (!id) {
      throw new Error("Produto deve ter um ID para ser atualizado.");
    }

    const response = await fetch(`${API_BASE_URL}/gerenciar-tipos-produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => null);  
      console.error("Erro ao atualizar produto:", response.status, errorDetails || "Nenhum detalhe disponível");
      throw new Error(`Erro | response | ${response.status}`);
    }
    

    return await response.json();
  }

  async excluirProduto(id) {
    const response = await fetch(`${API_BASE_URL}/gerenciar-tipos-produtos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir produto');
    }
    
    //window.location.reload();
    return await response.json();
  }
}

export default ProdutoService;
