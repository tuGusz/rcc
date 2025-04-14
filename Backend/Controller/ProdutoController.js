import TipoProduto from "../Model/Entidades/TipoProdutos.js";

class ProdutoController {
    constructor() {
        this.tipoProduto = new TipoProduto();
    }

    async listarProdutos(req, res) {
        try {
            const produtos = await this.tipoProduto.obterTodos();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ error: "Erro ao listar produtos" });
        }
    }

    async adicionarProduto(req, res) {
        try {
            const { nome, quantidade, unidade, detalhes, data } = req.body;
    
            if (!nome || !quantidade || !unidade || !data) {
                return res.status(400).json({ error: "Campos obrigatórios faltando" });
            }
    
            const regexData = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
            if (!regexData.test(data)) {
                return res.status(400).json({ error: "Data no formato inválido, deve ser YYYY-MM-DD HH:MM:SS" });
            }
            
            const produto = new TipoProduto(null, nome, quantidade, unidade, detalhes, data);
            const produtoCadastrado = await this.tipoProduto.insert(produto);
          
            console.log("Produto Cadastrado:", produtoCadastrado); 
            res.status(201).json({ message: produtoCadastrado.message, id: produtoCadastrado.id });
        } catch (error) {
            res.status(500).json({ error: "Erro ao adicionar produto" });
        }
    }

    async excluirProduto(req, res) {
        try {
          const id = parseInt(req.params.id); 
          console.log('Tentando excluir produto com ID:', id);
      
          if (!id) {
            return res.status(400).json({ error: "ID do produto não fornecido" });
          }
      
          const result = await this.tipoProduto.excluir(id);
      
          if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Produto não encontrado" });
          }
      
          res.status(200).json({ message: "Produto excluído com sucesso!" });
        } catch (error) {
          console.error('Erro ao excluir produto:', error);
          res.status(500).json({ error: "Erro ao excluir produto: " + error.message });
        }
      }
      
    
      async atualizarProduto(req, res) {
        try {
          const id = parseInt(req.params.id); 
          const { nome, quantidade, unidade, detalhes, data } = req.body;
      
          if (!nome || !quantidade || !unidade) {
            return res.status(400).json({ error: "Campos obrigatórios faltando" });
          }
      
          const produtoExistente = (await this.tipoProduto.obterTodos()).rows;
          console.log("produtoExistente", produtoExistente); 
      
          const produto = produtoExistente.find((produto) => produto.id === id);
      
          if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado" });
          }
      
          const novoProduto = { id, nome, quantidade, unidade, detalhes, data };
          const result = await this.tipoProduto.atualizar(novoProduto);
      
          if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Produto não encontrado para atualizar" });
          }
      
          res.status(200).json({ message: "Produto atualizado com sucesso!" });
        } catch (error) {
          console.error('Erro ao atualizar produto:', error);
          res.status(500).json({ error: "Erro ao atualizar produto: " + error.message });
        }
      }
      
      
    
    
}

export default ProdutoController;
