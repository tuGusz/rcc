import DataBase from "../database.js";

const database = new DataBase();

class Associado {
    constructor(cpf, nome, email, telefone, endereco, status, data_nascimento, foto, data_cadastro) {
        this.cpf = cpf;  // CPF é A chave primária... :D NOSSA :/
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.status = status;
        this.data_nascimento = data_nascimento;
        this.foto = foto;
        this.data_cadastro = data_cadastro;
    }

    async obterTodos() {
        try {
            return await database.ExecutaComando('SELECT * FROM associados');
        } catch (err) {
            throw new Error('Erro ao obter associados: ' + err.message);
        }
    }
    
    async obterPorId(cpf) {  
        try {
            const resultado = await database.ExecutaComando(
                'SELECT * FROM associados WHERE cpf = ?',
                [cpf]
            );

            if (resultado.length === 0) {
                return null;
            }

            return resultado;
        } catch (err) {
            throw new Error("Erro ao buscar associado: " + err.message);
        }
    }

    async inserir(associado) {
      const { cpf, nome, email, telefone, endereco, status, data_nascimento, foto } = associado; // Inclui todos os campos
        try {
            return await database.ExecutaComando(
                'INSERT INTO associados (cpf, nome, email, telefone, endereco, status, data_nascimento, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [cpf, nome, email, telefone, endereco, status, data_nascimento, foto]
            );
        } catch (err) {
            throw new Error('Erro ao inserir associado: ' + err.message);
        }
    }

    async atualizar(cpf, associado) {  
        const { nome, email, telefone, endereco, status, data_nascimento, foto } = associado;
        try {
            return await database.ExecutaComando(
                'UPDATE associados SET nome = ?, email = ?, telefone = ?, endereco = ?, status = ?, data_nascimento = ?, foto = ? WHERE cpf = ?',
                [nome, email, telefone, endereco, status, data_nascimento, foto, cpf]
            );
        } catch (err) {
            throw new Error('Erro ao atualizar associado: ' + err.message);
        }
    }

    async excluir(cpf) {  
        try {
            return await database.ExecutaComando('DELETE FROM associados WHERE cpf = ?', [cpf]);
        } catch (err) {
            throw new Error('Erro ao excluir associado: ' + err.message);
        }
    }
}

export default Associado;
