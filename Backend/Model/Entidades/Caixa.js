import DataBase from "../database.js";

const database = new DataBase();

class Caixa {
    async abrirCaixa(caixa) {
        const { dataAbertura, valorInicial, valorFinal, status, idGestao } = caixa;

        try {
            return await database.ExecutaComando(
                `INSERT INTO CAIXAS (data_abertura, valor_inicial, valor_final, status, id_gestao)
                 VALUES (?, ?, ?, ?, ?)`,
                [dataAbertura, valorInicial, valorFinal, status, idGestao]
            );
        } catch (err) {
            throw new Error('Erro ao abrir caixa: ' + err.message);
        }
    }

    // Função para adicionar valor ao caixa
    async adicionarValor(idCaixa, valor) {
        try {
            const result = await database.ExecutaComando(
                `UPDATE CAIXAS SET valor_final = valor_final + ? WHERE id_caixa = ? AND status = 'aberto'`,
                [valor, idCaixa]
            );

            if (result.affectedRows > 0) {
                // Registrar a movimentação no log
                await this.registrarMovimentacao(idCaixa, valor, 'adicionar');
                return { sucesso: true }; // Retorna sucesso se uma linha foi afetada
            } else {
                throw new Error('Caixa não encontrado ou já fechado.');
            }
        } catch (err) {
            throw new Error('Erro ao adicionar valor ao caixa: ' + err.message);
        }
    }

    // Função para retirar valor do caixa
    async retirarValor(idCaixa, valor) {
        try {
            const result = await database.ExecutaComando(
                `UPDATE CAIXAS SET valor_final = valor_final - ? WHERE id_caixa = ? AND status = 'aberto' AND valor_final >= ?`,
                [valor, idCaixa, valor]
            );

            if (result.affectedRows > 0) {
                // Registrar a movimentação no log
                await this.registrarMovimentacao(idCaixa, valor, 'retirar');
                return { sucesso: true }; // Retorna sucesso se uma linha foi afetada
            } else {
                throw new Error('Caixa não encontrado, já fechado ou saldo insuficiente.');
            }
        } catch (err) {
            throw new Error('Erro ao retirar valor do caixa: ' + err.message);
        }
    }

    // Função para registrar a movimentação
    async registrarMovimentacao(idCaixa, valor, tipo) {
        try {
            await database.ExecutaComando(
                `INSERT INTO CAIXA_MOVIMENTACOES (id_caixa, tipo, valor) VALUES (?, ?, ?)`,
                [idCaixa, tipo, valor]
            );
        } catch (err) {
            throw new Error('Erro ao registrar movimentação: ' + err.message);
        }
    }

    async fecharCaixa(idCaixa, { dataFechamento, valorFinal }) {
        try {
            return await database.ExecutaComando(
                `UPDATE CAIXAS SET data_fechamento = ?, valor_final = ?, status = 'fechado' WHERE id_caixa = ?`,
                [dataFechamento, valorFinal, idCaixa]
            );
        } catch (err) {
            throw new Error('Erro ao fechar caixa: ' + err.message);
        }
    }

    async obterTodos() {
        try {
            return await database.ExecutaComando(`SELECT * FROM CAIXAS`);
        } catch (err) {
            throw new Error('Erro ao obter caixas: ' + err.message);
        }
    }

    async obterMovimentacoes(idCaixa) {
        try {
            return await database.ExecutaComando(
                `SELECT * FROM CAIXA_MOVIMENTACOES WHERE id_caixa = ? ORDER BY data_movimentacao DESC`,
                [idCaixa]
            );

        } catch (err) {
            throw new Error('Erro ao obter movimentações: ' + err.message);
        }
    }

    // Função para buscar todas as movimentações
    async obterTodasMovimentacoes() {
        try {
            return await database.ExecutaComando(
                `SELECT * FROM CAIXA_MOVIMENTACOES ORDER BY data_movimentacao DESC`
            );
        } catch (err) {
            throw new Error('Erro ao obter movimentações: ' + err.message);
        }
    }
}



export default Caixa;
