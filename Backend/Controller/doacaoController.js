import Doacao from '../Model/Entidades/Doacao.js';

const registrarDoacao = async (req, res) => {
  try {
    const id = await Doacao.criar(req.body);
    res.status(201).json({ message: "Doação registrada com sucesso", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar doação" });
  }
};

const listarDoacoes = async (req, res) => {
  try {
    const doacoes = await Doacao.listar();
    res.json(doacoes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar doações" });
  }
};

export default { registrarDoacao, listarDoacoes };
