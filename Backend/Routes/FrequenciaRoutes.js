import { Router } from 'express';
import FrequenciaController from '../Controller/FrequenciaCtrl.js';

const router = Router();
const freque = new FrequenciaController();

router.post("/frequencia", freque.registrarFrequencia);
router.get("/frequencia/:eventoId", freque.listarFrequencias);

export default router; // exporta o router como default
