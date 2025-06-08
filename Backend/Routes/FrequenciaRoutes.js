import { Router } from 'express';
import FrequenciaController from '../Controller/FrequenciaCtrl.js';
import { autenticarToken } from '../Controller/Auth/authCtrl.js';

const router = Router();
const freque = new FrequenciaController();

router.post("/frequencia", autenticarToken, freque.registrarFrequencia);
router.get("/frequencia/:eventoId", autenticarToken, freque.listarFrequencias);
router.get("/usuarios", autenticarToken, freque.getAllUsersMeusAmores);
router.post('/relatorio-frequencia', autenticarToken, freque.relatorioFrequencia);


export default router;  
