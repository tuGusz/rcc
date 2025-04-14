import DataBase from "../database.js";

const database = new DataBase();

class Mensalidade {
  constructor(id, descricao, categoria, valor, dataVencimento, status) {
    this.id = id;
    this.descricao = descricao;
    this.categoria = categoria;
    this.valor = valor;
    this.dataVencimento = dataVencimento;
    this.status = status;
  }

  async obterTodas() {
    try {
      const result = await database.ExecutaComando("SELECT * FROM MENSALIDADES");
      return result;
    } catch (err) {
      throw new Error("Erro ao obter mensalidades: " + err.message);
    }
  }

  async excluir(id) {
    try {
      if (!id) {
        throw new Error("ID da mensalidade inválido");
      }

      const result = await database.ExecutaComando(
        "DELETE FROM MENSALIDADES WHERE id = ?",
        [id]
      );

      return result;
    } catch (err) {
      console.error("Erro ao excluir mensalidade:", err);
      throw new Error("Erro ao excluir mensalidade: " + err.message);
    }
  }

  async inserir(mensalidade) {
    const { descricao, categoria, valor, dataVencimento, status } = mensalidade;

    try {
      const result = await database.ExecutaComando(
        "INSERT INTO MENSALIDADES (descricao, categoria, valor, dataVencimento, status) VALUES (?, ?, ?, ?, ?)",
        [descricao, categoria, valor, dataVencimento, status]
      );

      console.log("Resultado da inserção:", result);

      const idGerado = result.insertId;
      return { id: idGerado, message: "Mensalidade adicionada com sucesso!" };
    } catch (err) {
      console.error("Erro ao inserir mensalidade:", err);
      throw new Error("Erro ao inserir mensalidade: " + err.message);
    }
  }

  async atualizar(mensalidade) {
    const { id, descricao, categoria, valor, dataVencimento, status } = mensalidade;

    try {
      const result = await database.ExecutaComando(
        "UPDATE MENSALIDADES SET descricao = ?, categoria = ?, valor = ?, dataVencimento = ?, status = ? WHERE id = ?",
        [descricao, categoria, valor, dataVencimento, status, id]
      );

      console.log("Resultado da atualização:", result);

      return result;
    } catch (err) {
      console.error("Erro ao atualizar mensalidade:", err);
      throw new Error("Erro ao atualizar mensalidade: " + err.message);
    }
  }
}

export default Mensalidade;
