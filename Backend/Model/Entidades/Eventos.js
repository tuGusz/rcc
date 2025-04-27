import DataBase from "../database.js"; 

const database = new DataBase();

class Event {
  constructor(id, nome, descricao, local, data_inicio, data_fim, obrigatorio, criado_por, data_criacao, atualizado_por, data_atualizacao) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.local = local;
    this.data_inicio = data_inicio;
    this.data_fim = data_fim;
    this.obrigatorio = obrigatorio;
    this.criado_por = criado_por;
    this.data_criacao = data_criacao;
    this.atualizado_por = atualizado_por;
    this.data_atualizacao = data_atualizacao;
  }

  static async createEvent(eventData) {
    const { nome, descricao, local, data_inicio, data_fim, obrigatorio, criado_por } = eventData;
    const query = "INSERT INTO eventos (nome, descricao, local, data_inicio, data_fim, obrigatorio, criado_por) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const valores = [nome, descricao, local, data_inicio, data_fim, obrigatorio, criado_por];
    try {
      const result = await database.ExecutaComando(query, valores);
      const id = result.insertId;
      return new Event(id, nome, descricao, local, data_inicio, data_fim, obrigatorio, criado_por);
    } catch (error) {
      throw new Error("Erro ao criar evento: " + error.message);
    }
  }

  static async getEventById(id) {
    const query = "SELECT * FROM eventos WHERE id = ?";
    const valores = [id];
    try {
      const result = await database.ExecutaComando(query, valores);
      if (result.length === 0) {
        return null;
      }
      const { nome, descricao, local, data_inicio, data_fim, obrigatorio, criado_por, data_criacao, atualizado_por, data_atualizacao } = result[0];
      return new Event(id, nome, descricao, local, data_inicio, data_fim, obrigatorio, criado_por, data_criacao, atualizado_por, data_atualizacao);
    } catch (error) {
      throw new Error("Erro ao buscar evento: " + error.message);
    }
  }

  static async getAllEvents() {
    const query = "SELECT * FROM eventos";
    try {
      const [rows] = await database.ExecutaComando(query);  
  
      return rows.map(event => new Event(
        event.id,
        event.nome,
        event.descricao,
        event.local,
        event.data_inicio,
        event.data_fim,
        event.obrigatorio,
        event.criado_por,
        event.data_criacao,
        event.atualizado_por,
        event.data_atualizacao
      ));
    } catch (error) {
      throw new Error("Erro ao listar eventos: " + error.message);
    }
  }
  

  static async updateEvent(id, eventData) {
    const { nome, descricao, local, data_inicio, data_fim, obrigatorio, atualizado_por } = eventData;
    const query = "UPDATE eventos SET nome = ?, descricao = ?, local = ?, data_inicio = ?, data_fim = ?, obrigatorio = ?, atualizado_por = ?, data_atualizacao = NOW() WHERE id = ?";
    const valores = [nome, descricao, local, data_inicio, data_fim, obrigatorio, atualizado_por, id];
    try {
      const result = await database.ExecutaComando(query, valores);
      if (result.affectedRows === 0) {
        return null;
      }
      return new Event(id, nome, descricao, local, data_inicio, data_fim, obrigatorio, null, null, atualizado_por); //Retorna um novo Event com os dados atualizados
    } catch (error) {
      throw new Error("Erro ao atualizar evento: " + error.message);
    }
  }

  static async deleteEvent(id) {
    const query = "DELETE FROM eventos WHERE id = ?";
    const valores = [id];
    try {
      const result = await database.ExecutaComando(query, valores);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Erro ao deletar evento: " + error.message);
    }
  }
}

export default Event;
