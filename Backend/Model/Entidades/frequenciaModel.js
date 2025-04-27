import db from '../database.js'; // Supondo que você tenha o arquivo de banco de dados configurado como 'db'

const database = new db();


class Frequencia {
    static async registrar(cpfAssociado, campanhaId) {
        try {
            // Verifica se o associado existe
            const [associado] = await database.ExecutaComando(
                'SELECT * FROM associados WHERE cpf = ?',
                [cpfAssociado]
            );
            if (!associado.length) throw new Error('Associado não encontrado');

            // Verifica se a campanha existe
            const [campanha] = await database.ExecutaComando(
                'SELECT * FROM campanha WHERE c_id = ?',
                [campanhaId]
            );
            if (!campanha.length) throw new Error('Campanha não encontrada');

            // Registra a frequência no banco de dados
            const [result] = await database.ExecutaComando(
                'INSERT INTO frequencias (cpf_associado, campanha_id) VALUES (?, ?)',
                [cpfAssociado, campanhaId]
            );

            return {
                id: result.insertId,
                cpfAssociado,
                campanhaId,
                dataRegistro: new Date()
            };
        } catch (error) {
            throw new Error('Erro ao registrar frequência: ' + error.message);
        }
    }

 
    static async listarPorCampanha(campanhaId) {
        try {
            // Lista as frequências de acordo com a campanha
            const [rows] = await database.ExecuteComando(
                'SELECT a.cpf, a.nome, f.data_registro ' +
                'FROM frequencias f ' +
                'JOIN associados a ON f.cpf_associado = a.cpf ' +
                'WHERE f.campanha_id = ?',
                [campanhaId]
            );
            return rows;
        } catch (error) {
            throw new Error('Erro ao listar frequências: ' + error.message);
        }
    }
}

export default Frequencia;
