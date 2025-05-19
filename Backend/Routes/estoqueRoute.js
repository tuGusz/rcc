import express from 'express';
import estoqueController from '../Controller/estoqueController.js';
import { autenticarToken } from '../Controller/Auth/authCtrl.js';

const router = express.Router();

// Rotas protegidas
router.post('/estoque', autenticarToken, estoqueController.registrarItemEstoque);
router.get('/estoque', autenticarToken, estoqueController.listarEstoque);
router.get('/estoque/:id', autenticarToken, estoqueController.buscarItemPorId);
router.put('/estoque/:id', autenticarToken, estoqueController.atualizarItem);
router.delete('/estoque/:id', autenticarToken, estoqueController.deletarItem);

export default router;
