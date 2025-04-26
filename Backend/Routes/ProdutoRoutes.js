import express from "express";
import ProdutoController from "../Controller/ProdutoController.js";
import { autenticarToken } from '../Controller/Auth/authCtrl.js';

const router = express.Router();
const produtoController = new ProdutoController();

router.get("/gerenciar-tipos-produtos", autenticarToken, (req, res) => produtoController.listarProdutos(req, res));
router.post("/gerenciar-tipos-produtos",  autenticarToken, (req, res) => produtoController.adicionarProduto(req, res));
router.delete("/gerenciar-tipos-produtos/:id",  autenticarToken, (req, res) => produtoController.excluirProduto(req, res));
router.put("/gerenciar-tipos-produtos/:id",  autenticarToken, (req, res) => produtoController.atualizarProduto(req, res));

export default router;
