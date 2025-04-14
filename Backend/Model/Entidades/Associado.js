import DataBase from "../database.js";

const database = new DataBase();

class Associado {
    constructor(id, nome, email, telefone, endereco) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
    }

    async obterTodos() {
        try {
            return await database.ExecutaComando('SELECT * FROM ASSOCIADOS');
        } catch (err) {
            throw new Error('Erro ao obter associados: ' + err.message);
        }
    }

 

    async obterPorId(cpf) {
        console.log(cpf)
        try {
            const resultado = await database.ExecutaComando(
                'SELECT * FROM ASSOCIADOS WHERE cpf = ?',
                [cpf]
            );
    
            console.log(resultado);
            if (resultado.length === 0) {
                return null; // Retorna null caso a campanha não seja encontrada
            }
    
            return resultado; // Retorna o primeiro item encontrado
        } catch (err) {
            throw new Error("Erro ao buscar associado: " + err.message);
        }
    }
    
    async inserir(associado) {
        const { nome, email, telefone, endereco } = associado;
        try {
            return await database.ExecutaComando(
                'INSERT INTO ASSOCIADOS (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)',
                [nome, email, telefone, endereco]
            );
        } catch (err) {
            throw new Error('Erro ao inserir associado: ' + err.message);
        }
    }

    async atualizar(id, associado) {
        const { nome, email, telefone, endereco } = associado;
        try {
            return await database.ExecutaComando(
                'UPDATE ASSOCIADOS SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?',
                [nome, email, telefone, endereco, id]
            );
        } catch (err) {
            throw new Error('Erro ao atualizar associado: ' + err.message);
        }
    }

    async excluir(id) {
        try {
            return await database.ExecutaComando('DELETE FROM ASSOCIADOS WHERE id = ?', [id]);
        } catch (err) {
            throw new Error('Erro ao excluir associado: ' + err.message);
        }
    }
}

export default Associado;
