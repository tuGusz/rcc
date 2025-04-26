import express from "express";
import MensalidadeController from "../Controller/MensalidadeController.js";
import { autenticarToken } from '../Controller/Auth/authCtrl.js';

const router = express.Router();
const mensalidadeController = new MensalidadeController();

router.get("/mensalidades", autenticarToken, (req, res) => mensalidadeController.listarMensalidades(req, res));
router.post("/mensalidades", autenticarToken, (req, res) => mensalidadeController.adicionarMensalidade(req, res));
router.delete("/mensalidades/:id", autenticarToken, (req, res) => mensalidadeController.excluirMensalidade(req, res));
router.put("/mensalidades/:id", autenticarToken, (req, res) => mensalidadeController.atualizarMensalidade(req, res));

export default router;
