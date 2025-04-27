const API_BASE_URL = "http://localhost:3002"; // Certifique-se de que a porta está correta

class EventosService {
    getToken() {
        return localStorage.getItem("token");
    }
    

  // Buscar todos os eventos
  async buscarEventos() {
    const response = await fetch(`${API_BASE_URL}/buscar-todos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });
  
    if (!response.ok) {
      throw new Error(`Erro ao buscar eventos: ${response.status}`);
    }
    return await response.json();
  }
  
  // Buscar um evento por ID
  async buscarEventoPorId(id) {
    const response = await fetch(`${API_BASE_URL}/buscar-evento/${id}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar evento: ${response.status}`);
    }
    return await response.json();
  }

  // Criar um novo evento
  async criarEvento(evento) {
    const response = await fetch(`${API_BASE_URL}/criar-evento`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evento),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar evento.');
    }
    return await response.json();
  }

  // Atualizar um evento
  async atualizarEvento(id, evento) {
    const response = await fetch(`${API_BASE_URL}/atualizar-evento/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evento),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar evento.');
    }
    return await response.json();
  }

  // Excluir um evento
  async excluirEvento(id) {
    const response = await fetch(`${API_BASE_URL}/deletar-evento/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar evento.');
    }
    return await response.json();
  }
 
}

export default new EventosService();
