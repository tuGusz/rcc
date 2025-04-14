import Associado from "../Model/Entidades/Associado.js";

const associado = new Associado();

class AssociadoController {
    async obterTodos(req, res) {
        try {
            const lista = await associado.obterTodos();
            return res.status(200).json(lista);
        } catch (erro) {
            console.error('Erro ao obter ASSOCIADOS:', erro);
            return res.status(500).json({ mensagem: 'Erro ao obter ASSOCIADOS.' });
        }
    }

    async listar(req, res) {
        try {
            const resultado = await associado.obterTodos();
            res.status(200).json(resultado);
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }

    async buscarPorId(req, res) {
        const { cpf } = req.params; // Recebe o CPF do parâmetro da URL
        try {
            console.log(cpf); // Verifique o valor do CPF

            const resultado = await associado.obterPorId(cpf); // Busca pelo CPF
            if (!resultado) {
                return res.status(404).json({ erro: "Associado não encontrado" }); // Caso não encontre
            }
            res.status(200).json(resultado); // Retorna o associado
        } catch (err) {
            res.status(500).json({ erro: err.message }); // Erro do servidor
        }
    }
    
    async criar(req, res) {
        try {
            const resultado = await associado.inserir(req.body);
            res.status(201).json({ mensagem: "Associado cadastrado com sucesso", id: resultado.insertId });
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }

    async atualizar(req, res) {
        const { id } = req.params;
        try {
            await associado.atualizar(id, req.body);
            res.status(200).json({ mensagem: "Associado atualizado com sucesso" });
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }

    async excluir(req, res) {
        const { id } = req.params;
        try {
            await associado.excluir(id);
            res.status(200).json({ mensagem: "Associado excluído com sucesso" });
        } catch (err) {
            res.status(500).json({ erro: err.message });
        }
    }
}

export default AssociadoController;