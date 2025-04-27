import express from 'express';
import doacaoController from '../Controller/doacaoController.js';
import { autenticarToken } from '../Controller/Auth/authCtrl.js';

const router = express.Router();

router.post('/doacoes', autenticarToken, doacaoController.registrarDoacao);
router.get('/doacoes', autenticarToken, doacaoController.listarDoacoes);

export default router;
