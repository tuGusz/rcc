import express from 'express';
import AssociadoController from '../Controller/AssociadoController.js';

const router = express.Router();
const associadoController = new AssociadoController();

// Definição das rotas para associados
router.get('/associados', (req, res) => associadoController.obterTodos(req, res));
router.get('/associados/:cpf', (req, res) => associadoController.buscarPorId(req, res));

router.post('/associados', (req, res) => associadoController.adicionar(req, res));
router.put('/associados/:cpf', (req, res) => associadoController.editar(req, res));
router.delete('/associados/:cpf', (req, res) => associadoController.excluir(req, res));

export default router;
