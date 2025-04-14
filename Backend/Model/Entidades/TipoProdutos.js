import DataBase from "../database.js";
 
const database = new DataBase();

class TipoProduto {
    constructor(id, nome, quantidade, unidade, detalhes, data) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.unidade = unidade;
        this.detalhes = detalhes;
        this.data = data;  
    }

    async obterTodos() {
        try {
          const result = await database.ExecutaComando('SELECT * FROM PRODUTOS');
          return result; 
        } catch (err) {
          throw new Error('Erro ao obter produtos: ' + err.message);
        }
      }
      

    async excluir(id) {
        try {
            if (!id) {
                throw new Error('ID do produto inválido');
            }
    
            const result = await database.ExecutaComando(
                'DELETE FROM PRODUTOS WHERE id = ?',
                [id]
            );
    
            return result;
        } catch (err) {
            console.error('Erro ao excluir produto:', err);
            throw new Error('Erro ao excluir produto: ' + err.message);
        }
    }
    
    async insert(produto) {
        const { nome, quantidade, unidade, detalhes, data } = produto;
        
        try {
            const result = await database.ExecutaComando(
                'INSERT INTO PRODUTOS (nome, quantidade, unidade, detalhes, data) VALUES (?, ?, ?, ?, ?)',
                [nome, quantidade, unidade, detalhes, data]
            );
    
            console.log('Resultado da inserção:', result);
    
      
            const idGerado = result.insertId;
            return { id: idGerado, message: "Produto adicionado com sucesso!" };
        } catch (err) {
            console.error('Erro ao inserir produto:', err);
            throw new Error('Erro ao inserir produto: ' + err.message);
        }
    }

    
    async atualizar(tipoProduto) {
        const { id, nome, quantidade, unidade, detalhes, data } = tipoProduto;
    
        try {
            console.log('Atualizando produto:', { id, nome, quantidade, unidade, detalhes, data });
    
            const result = await database.ExecutaComando(
                'UPDATE produtos SET nome = ?, quantidade = ?, unidade = ?, detalhes = ?, data = ? WHERE id = ?', 
                [nome, quantidade, unidade, detalhes, data, id]
            );
    
            console.log('Resultado da atualização:', result);
    
            return result;
        } catch (err) {
            console.error('Erro ao atualizar produto:', err);
            throw new Error('Erro ao atualizar produto: ' + err.message);
        }
    }
}

export default TipoProduto;
