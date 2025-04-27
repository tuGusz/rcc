const API_BASE_URL = "http://localhost:3002";

class CaixaService {
  getToken() {
    return localStorage.getItem("token");
  }

  async obterCaixasPorStatus(statusDesejado) {
    const response = await fetch(`${API_BASE_URL}/caixas`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao carregar caixas');
    }

    const resultado = await response.json();
    return resultado.rows.filter(caixa => caixa.status === statusDesejado);
  }

  async obterCaixasAbertos() {
    return this.obterCaixasPorStatus('aberto');
  }

  async obterCaixasFechados() {
    return this.obterCaixasPorStatus('fechado');
  }

  async abrirCaixa(dadosCaixa) {
    const response = await fetch(`${API_BASE_URL}/caixa/abrir`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify({
        dataAbertura: dadosCaixa.dataAbertura,  
        valorInicial: dadosCaixa.valorInicial, 
        idGestao: dadosCaixa.idGestao,  
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao abrir o caixa');
    }

    return await response.json();
  }

  async fecharCaixa(id, valorFinal) {
    // Obtém a data atual no formato adequado (por exemplo: 'YYYY-MM-DD HH:mm:ss')
    const dataFechamento = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const response = await fetch(`${API_BASE_URL}/caixa/fechar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`,
      },
      body: JSON.stringify({
        dataFechamento,
        valorFinal
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao fechar o caixa');
    }

    return await response.json();
  }

  // ✅ Função para movimentar o caixa (inserir ou retirar valor)
  async movimentarCaixa(id, valor, tipo) {
    const response = await fetch(`${API_BASE_URL}/caixa/movimentar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      },
      body: JSON.stringify({ valor, tipo }), // tipo pode ser "inserir" ou "retirar"
    });

    if (!response.ok) {
      throw new Error('Erro ao movimentar o caixa');
    }

    return await response.json();
  }

  async obterMovimentacoes(idCaixa) {
    console.log(idCaixa)
    const response = await fetch(`${API_BASE_URL}/caixa/movimentacoes/${idCaixa}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`, // Inclui o token de autorização
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao carregar movimentações');
    }

    const resultado = await response.json();
    return resultado.rows; // Assume-se que o retorno será no formato { rows: [...] }
  }
}

export default CaixaService;
