import DataBase from '../database.js';

const db = new DataBase();

class Doacao {
  constructor({ id, nome_doador, email, tipo, descricao, valor, data_entrega, local_entrega }) {
    this.id = id;
    this.nome_doador = nome_doador;
    this.email = email;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
    this.data_entrega = data_entrega;
    this.local_entrega = local_entrega;
  }

  // Criar nova doação
  static async criar(dados) {
    const { nome_doador, email, tipo, descricao, valor, data_entrega, local_entrega } = dados;

    const resultado = await db.ExecutaComando(
      `INSERT INTO doacoes 
       (nome_doador, email, tipo, descricao, valor, data_entrega, local_entrega)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome_doador, email, tipo, descricao, valor, data_entrega, local_entrega]
    );

    return resultado.rows?.insertId || null; // se insertId estiver disponível
  }

  // Listar todas as doações
  static async listar() {
    const resultado = await db.ExecutaComando('SELECT * FROM doacoes ORDER BY data_registro DESC');
    return resultado.rows.map(row => new Doacao(row));
  }

  // Buscar por ID
  static async buscarPorId(id) {
    const resultado = await db.ExecutaComando('SELECT * FROM doacoes WHERE id = ?', [id]);
    return resultado.rows.length ? new Doacao(resultado.rows[0]) : null;
  }
}

export default Doacao;
