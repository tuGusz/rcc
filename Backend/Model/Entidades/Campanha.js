import DataBase from "../database.js";

const database = new DataBase();

class Campanha {
    constructor(id, nome, local, descricao, dataInicio, dataFim) {
        this.id = id;
        this.nome = nome;
        this.local = local;
        this.descricao = descricao;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }

    // Obter todas as campanhas
    async obterTodos() {
        try {
            const campanhas = await database.ExecutaComando('SELECT * FROM CAMPANHA');
            return campanhas;
        } catch (err) {
            throw new Error('Erro ao obter campanhas: ' + err.message);
        }
    }

    async obterPorId(id) {
        try {
            const resultado = await database.ExecutaComando(
                'SELECT * FROM CAMPANHA WHERE c_id = ?',
                [id]
            );
    
            console.log(resultado);
            if (resultado.length === 0) {
                return null; // Retorna null caso a campanha não seja encontrada
            }
    
            return resultado; // Retorna o primeiro item encontrado
        } catch (err) {
            throw new Error("Erro ao buscar campanha: " + err.message);
        }
    }
    

    // Excluir campanha
    async excluir(id) {
        try {
            const result = await database.ExecutaComando('DELETE FROM CAMPANHA WHERE c_id = ?', [id]);
            return result;
        } catch (err) {
            throw new Error('Erro ao excluir campanha: ' + err.message);
        }
    }

    // Inserir nova campanha
    async insert(campanha) {
        const { nome, local, descricao, dataInicio, dataFim } = campanha;

        try {
            const result = await database.ExecutaComando(
                'INSERT INTO CAMPANHA (c_nome, c_local, c_descricao, c_data_inicio, c_data_fim) VALUES (?, ?, ?, ?, ?)',
                [nome, local, descricao, dataInicio, dataFim]
            );
            return result;
        } catch (err) {
            throw new Error('Erro ao inserir campanha: ' + err.message);
        }
    }

    // Atualizar campanha existente
    async update(id, campanha) {
        const { nome, local, descricao, dataInicio, dataFim } = campanha;
    
        if (!nome || !local || !descricao || !dataInicio || !dataFim) {
            throw new Error("Todos os campos são obrigatórios para a atualização.");
        }
    
        try {
            const result = await database.ExecutaComando(
                'UPDATE CAMPANHA SET c_nome = ?, c_local = ?, c_descricao = ?, c_data_inicio = ?, c_data_fim = ? WHERE c_id = ?',
                [nome, local, descricao, dataInicio, dataFim, id]
            );
    
            return result;
        } catch (err) {
            throw new Error("Erro ao atualizar campanha: " + err.message);
        }
    }
}

export default Campanha;
