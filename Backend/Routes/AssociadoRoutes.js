import express from 'express';
import AssociadoController from '../Controller/AssociadoController.js';
import { autenticarToken } from '../Controller/Auth/authCtrl.js';

const router = express.Router();
const associadoController = new AssociadoController();

// Definição das rotas para associados
router.get('/associados', autenticarToken, (req, res) => associadoController.obterTodos(req, res));
router.get('/associados/:cpf', autenticarToken, (req, res) => associadoController.buscarPorId(req, res));

router.post('/associados', autenticarToken, (req, res) => associadoController.criar(req, res));
router.put('/associados/:cpf', autenticarToken, (req, res) => associadoController.editar(req, res));
router.delete('/associados/:cpf', autenticarToken, (req, res) => associadoController.excluir(req, res));

export default router;
