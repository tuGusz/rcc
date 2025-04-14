import DataBase from "../database.js";

const database = new DataBase();

class Comissao {
    constructor(id, valor, dataPagamento, status, idAssociado) {
        this.id = id;
        this.valor = valor;
        this.dataPagamento = dataPagamento;
        this.status = status;
        this.idAssociado = idAssociado;
    }

    // Obter todas as comissões
    async obterTodos() {
        try {
            return await database.ExecutaComando('SELECT * FROM COMISSOES');
        } catch (err) {
            throw new Error('Erro ao obter comissões: ' + err.message);
        }
    }

    // Inserir uma nova comissão
    async inserir(comissao) {
        const { valor, dataPagamento, status, idAssociado } = comissao;

        try {
            return await database.ExecutaComando(
                'INSERT INTO COMISSOES (valor, data_pagamento, status, id_associado) VALUES (?, ?, ?, ?)',
                [valor, dataPagamento, status, idAssociado]
            );
        } catch (err) {
            throw new Error('Erro ao inserir comissão: ' + err.message);
        }
    }

    // Atualizar uma comissão existente
    async atualizar(id, comissao) {
        const { valor, dataPagamento, status, idAssociado } = comissao;

        try {
            return await database.ExecutaComando(
                'UPDATE COMISSOES SET valor = ?, data_pagamento = ?, status = ?, id_associado = ? WHERE id_comissao = ?',
                [valor, dataPagamento, status, idAssociado, id]
            );
        } catch (err) {
            throw new Error('Erro ao atualizar comissão: ' + err.message);
        }
    }

    // Excluir uma comissão
    async excluir(id) {
        try {
            return await database.ExecutaComando('DELETE FROM COMISSOES WHERE id_comissao = ?', [id]);
        } catch (err) {
            throw new Error('Erro ao excluir comissão: ' + err.message);
        }
    }
}

export default Comissao;
