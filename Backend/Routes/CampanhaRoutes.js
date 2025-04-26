import express from 'express';
import CampanhaController from "../Controller/CampanhaController.js";
import { autenticarToken } from '../Controller/Auth/authCtrl.js';

const campanhaController = new CampanhaController();
const router = express.Router();

// Obter todas as campanhas
router.get('/campanhas', autenticarToken, campanhaController.obterTodos.bind(campanhaController));

// Adicione esta nova rota
router.get('/campanha/:id', autenticarToken, campanhaController.obterPorId.bind(campanhaController));

// Adicionar uma nova campanha
router.post('/campanha', autenticarToken, campanhaController.adicionar.bind(campanhaController));

// Excluir uma campanha pelo ID
router.delete('/campanha/:id', autenticarToken, campanhaController.excluir.bind(campanhaController));

router.put('/campanha/:id', autenticarToken, campanhaController.editar);

export default router;
