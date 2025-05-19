import DataBase from '../database.js';

const db = new DataBase();

class Estoque {
  constructor({ id, id_doacao, nome_item, descricao, quantidade, data_entrada }) {
    this.id = id;
    this.id_doacao = id_doacao;
    this.nome_item = nome_item;
    this.descricao = descricao;
    this.quantidade = quantidade;
    this.data_entrada = data_entrada;
  }

  // Registrar novo item no estoque
  static async registrar({ id_doacao, nome_item, descricao, quantidade }) {
    const resultado = await db.ExecutaComando(
      `INSERT INTO estoque (id_doacao, nome_item, descricao, quantidade)
       VALUES (?, ?, ?, ?)`,
      [id_doacao, nome_item, descricao, quantidade]
    );

    return resultado.rows?.insertId || null;
  }

  // Listar todos os itens do estoque
  static async listar() {
    const resultado = await db.ExecutaComando(`
      SELECT e.*, d.nome_doador, d.tipo
      FROM estoque e
      LEFT JOIN doacoes d ON d.id = e.id_doacao
      ORDER BY e.data_entrada DESC
    `);
    return resultado.rows.map(row => new Estoque(row));
  }

  // Buscar item específico por ID
  static async buscarPorId(id) {
    const resultado = await db.ExecutaComando('SELECT * FROM estoque WHERE id = ?', [id]);
    return resultado.rows.length ? new Estoque(resultado.rows[0]) : null;
  }

  static async atualizar(id, dados) {
    const { nome_item, descricao, quantidade } = dados;

    const resultado = await db.ExecutaComando(
      `UPDATE estoque 
      SET nome_item = ?, descricao = ?, quantidade = ? 
      WHERE id = ?`,
      [nome_item, descricao, quantidade, id]
    );

    return resultado.rows.affectedRows > 0;
  }

  // Deletar item por ID
  static async deletar(id) {
    const resultado = await db.ExecutaComando(
      `DELETE FROM estoque WHERE id = ?`,
      [id]
    );

    return resultado.rowsAffected > 0;
  }
  
}

export default Estoque;
