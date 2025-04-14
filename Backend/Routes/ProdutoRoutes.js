import express from "express";
import ProdutoController from "../Controller/ProdutoController.js";

const router = express.Router();
const produtoController = new ProdutoController();

router.get("/gerenciar-tipos-produtos", (req, res) => produtoController.listarProdutos(req, res));
router.post("/gerenciar-tipos-produtos", (req, res) => produtoController.adicionarProduto(req, res));
router.delete("/gerenciar-tipos-produtos/:id", (req, res) => produtoController.excluirProduto(req, res));
router.put("/gerenciar-tipos-produtos/:id", (req, res) => produtoController.atualizarProduto(req, res));

export default router;
