import Campanha from "../Model/Entidades/Campanha.js";

const campanha = new Campanha();

class CampanhaController {
    async obterTodos(req, res) {
        try {
            const lista = await campanha.obterTodos();
            return res.status(200).json(lista);
        } catch (erro) {
            console.error('Erro ao obter campanhas:', erro);
            return res.status(500).json({ mensagem: 'Erro ao obter campanhas.' });
        }
    }

    async obterPorId(req, res) {
        const { id } = req.params;
    
        try {
            const campanhaEncontrada = await campanha.obterPorId(id);
    
            if (!campanhaEncontrada) {
                return res.status(404).json({
                    mensagem: "Campanha não encontrada",
                    detalhes: `Nenhuma campanha encontrada com o ID ${id}`,
                });
            }
    
            return res.status(200).json(campanhaEncontrada);
        } catch (err) {
            console.error("Erro ao obter campanha:", err);
            return res.status(500).json({
                mensagem: "Erro ao buscar campanha",
                detalhes: err.message,
            });
        }
    }
    

    // Adicionar uma nova campanha
    async adicionar(req, res) {
        const { nome, local, descricao, dataInicio, dataFim } = req.body;

        try {
            const campanhaData = { nome, local, descricao, dataInicio, dataFim };
            const result = await campanha.insert(campanhaData);

            if (result.affectedRows > 0) {
                return res.status(201).json({ mensagem: 'Campanha cadastrada com sucesso!' });
            } else {
                return res.status(400).json({ mensagem: 'Erro ao cadastrar campanha.' });
            }
        } catch (err) {
            console.error('Erro ao cadastrar campanha:', err);
            return res.status(500).json({ mensagem: 'Erro interno ao cadastrar campanha.' });
        }
    }

    // Atualizar uma campanha existente
    async editar(req, res) {
        const { id } = req.params;
        const { nome, local, descricao, dataInicio, dataFim } = req.body;
    
        try {
            const campanhaData = { nome, local, descricao, dataInicio, dataFim };
            const result = await campanha.update(id, campanhaData);
    
            if (result.affectedRows > 0) {
                return res.status(200).json({ mensagem: 'Campanha atualizada com sucesso!' });
            } else {
                return res.status(404).json({ mensagem: 'Campanha não encontrada.' });
            }
        } catch (err) {
            console.error('Erro ao editar campanha:', err);
            return res.status(500).json({ mensagem: 'Erro ao editar campanha.' });
        }
    }

    // Excluir uma campanha
    async excluir(req, res) {
        const { id } = req.params;

        try {
            const result = await campanha.excluir(id);

            if (result.affectedRows > 0) {
                return res.status(200).json({ mensagem: 'Campanha excluída com sucesso.' });
            } else {
                return res.status(404).json({ mensagem: 'Campanha não encontrada.' });
            }
        } catch (erro) {
            console.error('Erro ao excluir campanha:', erro);
            return res.status(500).json({ mensagem: 'Erro ao excluir campanha.' });
        }
    }
}

export default CampanhaController;
