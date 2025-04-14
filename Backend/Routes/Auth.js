import { Router } from 'express';
import { login, createUser } from '../Controller/Auth/authCtrl.js';
import { autenticarToken } from '../Controller/Auth/authCtrl.js';

const router = Router();

// Login de usuário
router.post('/api/login', login);

// Criar novo usuário - Só pode ser feito por Administradores
router.post('/registrar', autenticarToken, createUser);

// Rota para obter os dados do usuário logado
router.get('/api/me', autenticarToken, (req, res) => {
    res.json(req.usuario);
});

export default router;
