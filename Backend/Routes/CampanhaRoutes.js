import express from 'express';
import CampanhaController from "../Controller/CampanhaController.js";
// import { autenticarToken } from '../Controller/Auth/AuthCtrl.js';

const campanhaController = new CampanhaController();
const router = express.Router();

// Obter todas as campanhas
router.get('/campanhas', campanhaController.obterTodos.bind(campanhaController));

// Adicione esta nova rota
router.get('/campanha/:id', campanhaController.obterPorId.bind(campanhaController));

// Adicionar uma nova campanha
router.post('/campanha', campanhaController.adicionar.bind(campanhaController));

// Excluir uma campanha pelo ID
router.delete('/campanha/:id', campanhaController.excluir.bind(campanhaController));

router.put('/campanha/:id', campanhaController.editar);

export default router;
