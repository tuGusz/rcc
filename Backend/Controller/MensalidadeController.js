import Mensalidade from "../Model/Entidades/Mensalidade.js";

class MensalidadeController {
  constructor() {
    this.mensalidade = new Mensalidade();
  }

  async listarMensalidades(req, res) {
    try {
      const mensalidades = await this.mensalidade.obterTodas();
      res.status(200).json(mensalidades);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar mensalidades" });
    }
  }

  async adicionarMensalidade(req, res) {
    try {
      const { descricao, categoria, valor, dataVencimento, status } = req.body;

      if (!descricao || !categoria || !valor || !dataVencimento) {
        return res.status(400).json({ error: "Campos obrigatórios faltando" });
      }

      const novaMensalidade = new Mensalidade(
        null,
        descricao,
        categoria,
        valor,
        dataVencimento,
        status || "Pendente" 
      );

      const mensalidadeCadastrada = await this.mensalidade.inserir(novaMensalidade);

      res.status(201).json({
        message: mensalidadeCadastrada.message,
        id: mensalidadeCadastrada.id,
      });
    } catch (error) {
      res.status(500).json({ error: "Erro ao adicionar mensalidade" });
    }
  }

  async excluirMensalidade(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (!id) {
        return res.status(400).json({ error: "ID da mensalidade não fornecido" });
      }

      const result = await this.mensalidade.excluir(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Mensalidade não encontrada" });
      }

      res.status(200).json({ message: "Mensalidade excluída com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir mensalidade: " + error.message });
    }
  }

  async atualizarMensalidade(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { descricao, categoria, valor, dataVencimento, status } = req.body;

      if (!descricao || !categoria || !valor || !dataVencimento) {
        return res.status(400).json({ error: "Campos obrigatórios faltando" });
      }

      const mensalidadeAtualizada = {
        id,
        descricao,
        categoria,
        valor,
        dataVencimento,
        status,
      };

      const result = await this.mensalidade.atualizar(mensalidadeAtualizada);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Mensalidade não encontrada para atualizar" });
      }

      res.status(200).json({ message: "Mensalidade atualizada com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar mensalidade: " + error.message });
    }
  }
}

export default MensalidadeController;
