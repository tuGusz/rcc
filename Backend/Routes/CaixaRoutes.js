import express from 'express';
import CaixaController from "../Controller/CaixaController.js";
import { autenticarToken } from '../Controller/Auth/authCtrl.js';

const caixaController = new CaixaController();
const router = express.Router();

// Abrir caixa
router.post('/caixa/abrir', autenticarToken, caixaController.abrir.bind(caixaController));

// Inserir movimentação (somar valor)
router.put('/caixa/movimentar/:id', autenticarToken, caixaController.inserirMovimentacao.bind(caixaController));

// Fechar caixa
router.put('/caixa/fechar/:id', autenticarToken, caixaController.fechar.bind(caixaController));

// Listar todos os caixas
router.get('/caixas', autenticarToken, caixaController.listarTodos.bind(caixaController));

// Buscar movimentações de um caixa específico
router.get('/caixa/movimentacoes/:id', autenticarToken, caixaController.listarMovimentacoes.bind(caixaController));

// (Opcional) Buscar todas as movimentações
router.get('/caixa/movimentacoes', autenticarToken, caixaController.listarTodasMovimentacoes.bind(caixaController));

export default router;
