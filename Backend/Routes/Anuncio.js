import express from 'express';
import listar  from '../Controller/Auth/anuncioCtrl.js';

const router = express.Router();
router.get('/', listar);

export default router;