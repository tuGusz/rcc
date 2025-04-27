const API_BASE_URL = "http://localhost:3002";

class ComissaoService {
  getToken() {
    return localStorage.getItem("token");
  }
  
  // Obter todas as comissões
  async obterTodasComissoes() {
    const response = await fetch(`${API_BASE_URL}/comissoes`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao carregar comissões');
    }

    const dados = await response.json();
    return dados;
  }

  // Excluir uma comissão pelo ID
  async excluirComissao(id) {
    const response = await fetch(`${API_BASE_URL}/comissao/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
       },
      
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir comissão');
    }

    return response.json();
  }

  // Adicionar uma nova comissão
  async adicionarComissao(comissao) {
    const response = await fetch(`${API_BASE_URL}/comissao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify(comissao),
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar a comissão');
    }

    return response.json();
  }

  // Editar uma comissão existente
  async editarComissao(id, comissao) {
    const response = await fetch(`${API_BASE_URL}/comissao/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 
        'Authorization': `Bearer ${this.getToken()}`,
       },
      body: JSON.stringify(comissao),
    });

    if (!response.ok) {
      throw new Error('Erro ao editar comissão');
    }

    return response.json();
  }
}

export default ComissaoService;
