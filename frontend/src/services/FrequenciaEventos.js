const API_BASE_URL = "http://localhost:3002";

class RelatorioFrequenciaService {
  getToken() {
    return localStorage.getItem("token");
  }
  
  async buscarRelatorio({ nome, dataInicio, dataFim }) {
  const response = await fetch(`${API_BASE_URL}/relatorio-frequencia`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    },
    body: JSON.stringify({ nome, dataInicio, dataFim })
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar relatório de frequência");
  }

  return await response.json();
}

}

export default new RelatorioFrequenciaService();
