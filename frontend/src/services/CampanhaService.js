const API_BASE_URL = "http://localhost:3002";

class CampanhaService {
  // Obter todas as campanhas
  async obterTodasCampanhas() {
    const response = await fetch(`${API_BASE_URL}/campanhas`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao carregar campanhas');
    }

    const dados = await response.json();
    return dados;
  }

  // Excluir uma campanha pelo ID
  async excluirCampanha(id) {
    const response = await fetch(`${API_BASE_URL}/campanha/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir campanha');
    }

    return response.json();
  }

  // Adicionar uma nova campanha
  async adicionarCampanha(campanha) {
    const response = await fetch(`${API_BASE_URL}/campanha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campanha),
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar a campanha');
    }

    return response.json();
  }

  // Editar uma campanha existente
  async editarCampanha(id, campanha) {
    const response = await fetch(`${API_BASE_URL}/campanha/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campanha),
    });

    if (!response.ok) {
        throw new Error('Erro ao editar campanha');
    }

    return response.json();
}
}

export default CampanhaService;
