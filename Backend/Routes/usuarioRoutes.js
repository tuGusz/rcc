import express from 'express';
import UserController from '../Controller/UserController.js';  

const router = express.Router();

router.post('/recuperar-senha', (req, res) => UserController.recuperarSenha(req, res));
router.post('/verificar-codigo', (req, res) => UserController.verificarCodigo(req, res));
router.post('/redefinir-senha', (req, res) => UserController.redefinirSenha(req, res));

export default router;
