const API_BASE_URL = "http://localhost:3002";

class MensalidadeService {
  async getAllMensalidades() {
    const response = await fetch(`${API_BASE_URL}/mensalidades`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao obter mensalidades');
    }

    return await response.json();
  }
 
  async adicionarMensalidade(mensalidade) {
    try {
      console.log('Mensalidade enviada:', mensalidade);

      const response = await fetch(`${API_BASE_URL}/mensalidades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensalidade),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Erro ao adicionar mensalidade:', errorData);
        throw new Error('Erro ao adicionar mensalidade');
      }

      const mensalidadeCadastrada = await response.json();
      console.log('Mensalidade cadastrada:', mensalidadeCadastrada);
      return mensalidadeCadastrada;
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  }
 
  async atualizarMensalidade(id, mensalidade) {
    if (!id) {
      throw new Error("Mensalidade deve ter um ID para ser atualizada.");
    }

    const response = await fetch(`${API_BASE_URL}/mensalidades/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mensalidade),
    });

    if (!response.ok) {
      const errorDetails = await response.json().catch(() => null);
      console.error("Erro ao atualizar mensalidade:", response.status, errorDetails || "Nenhum detalhe disponível");
      throw new Error(`Erro ao atualizar mensalidade: ${response.status}`);
    }

    return await response.json();
  }

 
  async excluirMensalidade(id) {
    const response = await fetch(`${API_BASE_URL}/mensalidades/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir mensalidade');
    }

    return await response.json();
  }
}

export default MensalidadeService;
