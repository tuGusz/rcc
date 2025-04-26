const API_BASE_URL = "http://localhost:3002";

class ComissaoService {
  
  async obterTodasComissoes() {
    const response = await fetch(`${API_BASE_URL}/comissoes`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao carregar comissões');
    }

    const dados = await response.json();
    return dados;
  }
 
  async excluirComissao(id) {
    const response = await fetch(`${API_BASE_URL}/comissao/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir comissão');
    }

    return response.json();
  }

 
  async adicionarComissao(comissao) {
    const response = await fetch(`${API_BASE_URL}/comissao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comissao),
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar a comissão');
    }

    return response.json();
  }

 
  async editarComissao(id, comissao) {
    const response = await fetch(`${API_BASE_URL}/comissao/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comissao),
    });

    if (!response.ok) {
      throw new Error('Erro ao editar comissão');
    }

    return response.json();
  }
}

export default ComissaoService;
