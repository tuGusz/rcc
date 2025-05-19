import Estoque from '../Model/Entidades/Estoque.js';

// Criar novo item no estoque
const registrarItemEstoque = async (req, res) => {
  try {
    const id = await Estoque.registrar(req.body);
    res.status(201).json({ message: "Item registrado no estoque com sucesso", id });
  } catch (err) {
    console.error("Erro ao registrar item no estoque:", err);
    res.status(500).json({ error: "Erro ao registrar item no estoque" });
  }
};

// Listar todos os itens do estoque
const listarEstoque = async (req, res) => {
  try {
    const itens = await Estoque.listar();
    res.json(itens);
  } catch (err) {
    console.error("Erro ao listar estoque:", err);
    res.status(500).json({ error: "Erro ao buscar itens do estoque" });
  }
};

// Buscar item por ID
const buscarItemPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Estoque.buscarPorId(id);

    if (!item) {
      return res.status(404).json({ error: "Item não encontrado" });
    }

    res.json(item);
  } catch (err) {
    console.error("Erro ao buscar item:", err);
    res.status(500).json({ error: "Erro ao buscar item no estoque" });
  }
};

// Atualizar item
const atualizarItem = async (req, res) => {
  try {
    const id = req.params.id;
    const atualizado = await Estoque.atualizar(id, req.body);

    if (!atualizado) {
      return res.status(404).json({ error: "Item não encontrado para atualizar" });
    }

    res.json({ message: "Item atualizado com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar item:", err);
    res.status(500).json({ error: "Erro ao atualizar item no estoque" });
  }
}

// Deletar item
const deletarItem = async (req, res) => {
  try {
    const id = req.params.id;
    const deletado = await Estoque.deletar(id);

    if (!deletado) {
      return res.status(404).json({ error: "Item não encontrado para exclusão" });
    }

    res.json({ message: "Item excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir item:", err);
    res.status(500).json({ error: "Erro ao excluir item do estoque" });
  }
};

export default {
  registrarItemEstoque,
  listarEstoque,
  buscarItemPorId,
  atualizarItem,
  deletarItem
};
