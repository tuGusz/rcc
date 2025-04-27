import express from 'express';
import ComissaoController from "../Controller/ComissaoController.js";
import { autenticarToken } from '../Controller/Auth/authCtrl.js';

const comissaoController = new ComissaoController();
const router = express.Router();

// Obter todas as comissões
router.get('/comissoes', autenticarToken, comissaoController.obterTodos.bind(comissaoController));

// Adicionar uma nova comissão
router.post('/comissao', autenticarToken, comissaoController.adicionar.bind(comissaoController));

// Atualizar uma comissão
router.put('/comissao/:id', autenticarToken, comissaoController.editar.bind(comissaoController));

// Excluir uma comissão
router.delete('/comissao/:id',autenticarToken, comissaoController.excluir.bind(comissaoController));

export default router;
