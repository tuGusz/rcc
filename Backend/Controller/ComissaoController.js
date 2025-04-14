import Comissao from "../Model/Entidades/Comissoes.js";

const comissao = new Comissao();

class ComissaoController {
    // Obter todas as comissões
    async obterTodos(req, res) {
        try {
            const lista = await comissao.obterTodos();
            return res.status(200).json(lista);
        } catch (erro) {
            console.error('Erro ao obter comissões:', erro);
            return res.status(500).json({ mensagem: 'Erro ao obter comissões.' });
        }
    }

    // Adicionar uma nova comissão
    async adicionar(req, res) {
        const { valor, dataPagamento, status, idAssociado } = req.body;

        try {
            const novaComissao = { valor, dataPagamento, status, idAssociado };
            const result = await comissao.inserir(novaComissao);

            if (result.affectedRows > 0) {
                return res.status(201).json({ mensagem: 'Comissão cadastrada com sucesso!' });
            } else {
                return res.status(400).json({ mensagem: 'Erro ao cadastrar comissão.' });
            }
        } catch (erro) {
            console.error('Erro ao cadastrar comissão:', erro);
            return res.status(500).json({ mensagem: 'Erro interno ao cadastrar comissão.' });
        }
    }

    // Atualizar uma comissão
    async editar(req, res) {
        const { id } = req.params;
        const { valor, dataPagamento, status, idAssociado } = req.body;

        try {
            const comissaoAtualizada = { valor, dataPagamento, status, idAssociado };
            const result = await comissao.atualizar(id, comissaoAtualizada);

            if (result.affectedRows > 0) {
                return res.status(200).json({ mensagem: 'Comissão atualizada com sucesso!' });
            } else {
                return res.status(404).json({ mensagem: 'Comissão não encontrada.' });
            }
        } catch (erro) {
            console.error('Erro ao editar comissão:', erro);
            return res.status(500).json({ mensagem: 'Erro ao editar comissão.' });
        }
    }

    // Excluir uma comissão
    async excluir(req, res) {
        const { id } = req.params;

        try {
            const result = await comissao.excluir(id);

            if (result.affectedRows > 0) {
                return res.status(200).json({ mensagem: 'Comissão excluída com sucesso.' });
            } else {
                return res.status(404).json({ mensagem: 'Comissão não encontrada.' });
            }
        } catch (erro) {
            console.error('Erro ao excluir comissão:', erro);
            return res.status(500).json({ mensagem: 'Erro ao excluir comissão.' });
        }
    }
}

export default ComissaoController;
