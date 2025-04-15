import Caixa from "../Model/Entidades/Caixa.js";

const caixa = new Caixa();

class CaixaController {
    // Abrir um novo caixa
    async abrir(req, res) {
        const { dataAbertura, valorInicial, idGestao } = req.body;

        try {
            const novoCaixa = {
                dataAbertura,
                valorInicial,
                valorFinal: valorInicial, // inicia com o mesmo valor
                status: 'aberto',
                idGestao
            };

            const result = await caixa.abrirCaixa(novoCaixa);

            if (result.affectedRows > 0) {
                return res.status(201).json({ mensagem: 'Caixa aberto com sucesso!' });
            } else {
                return res.status(400).json({ mensagem: 'Erro ao abrir caixa.' });
            }
        } catch (erro) {
            console.error('Erro ao abrir caixa:', erro);
            return res.status(500).json({ mensagem: 'Erro interno ao abrir caixa.' });
        }
    }

    // Controller para movimentação de valor no caixa
    async inserirMovimentacao(req, res) {
        const { id } = req.params; // ID do caixa
        const { valor, tipo } = req.body; // Valor da movimentação e tipo (adicionar ou retirar)

        try {
            // Lógica de movimentação
            if (tipo === "adicionar") {
                const result = await caixa.adicionarValor(id, valor);
                if (result.sucesso) {
                    return res.status(200).json({ mensagem: 'Valor adicionado com sucesso.' });
                }
            } else if (tipo === "retirar") {
                const result = await caixa.retirarValor(id, valor);
                if (result.sucesso) {
                    return res.status(200).json({ mensagem: 'Valor retirado com sucesso.' });
                }
            } else {
                return res.status(400).json({ mensagem: 'Tipo inválido de movimentação.' });
            }

            return res.status(404).json({ mensagem: 'Caixa não encontrado ou erro na movimentação.' });
        } catch (erro) {
            console.error('Erro ao movimentar valor no caixa:', erro);
            return res.status(500).json({ mensagem: erro.message });
        }
    }

    // Fechar caixa
    async fechar(req, res) {
        const { id } = req.params;
        const { dataFechamento, valorFinal } = req.body;

        try {
            const result = await caixa.fecharCaixa(id, { dataFechamento, valorFinal });

            if (result.affectedRows > 0) {
                return res.status(200).json({ mensagem: 'Caixa fechado com sucesso!' });
            } else {
                return res.status(404).json({ mensagem: 'Caixa não encontrado.' });
            }
        } catch (erro) {
            console.error('Erro ao fechar caixa:', erro);
            return res.status(500).json({ mensagem: 'Erro ao fechar caixa.' });
        }
    }

    // Listar todos os caixas
    async listarTodos(req, res) {
        try {
            const caixas = await caixa.obterTodos();
            return res.status(200).json(caixas);
        } catch (erro) {
            console.error('Erro ao listar caixas:', erro);
            return res.status(500).json({ mensagem: 'Erro ao listar caixas.' });
        }
    }

    // Listar movimentações de um caixa específico
    async listarMovimentacoes(req, res) {
        const { id } = req.params;

        try {
            const movimentacoes = await caixa.obterMovimentacoes(id);
            if (movimentacoes.rows.length > 0) {
                return res.status(200).json(movimentacoes);
            } else {
                return res.status(404).json({ mensagem: 'Nenhuma movimentação encontrada para este caixa.' });
            }
        } catch (erro) {
            console.error('Erro ao listar movimentações:', erro);
            return res.status(500).json({ mensagem: 'Erro ao listar movimentações.' });
        }
    }

    // Listar todas as movimentações
    async listarTodasMovimentacoes(req, res) {
        try {
            const movimentacoes = await caixa.obterTodasMovimentacoes();
            if (movimentacoes.length > 0) {
                return res.status(200).json(movimentacoes);
            } else {
                return res.status(404).json({ mensagem: 'Nenhuma movimentação encontrada.' });
            }
        } catch (erro) {
            console.error('Erro ao listar movimentações:', erro);
            return res.status(500).json({ mensagem: 'Erro ao listar movimentações.' });
        }
    }
}

export default CaixaController;
