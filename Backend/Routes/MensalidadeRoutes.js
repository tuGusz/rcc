import express from "express";
import MensalidadeController from "../Controller/MensalidadeController.js";

const router = express.Router();
const mensalidadeController = new MensalidadeController();

router.get("/mensalidades", (req, res) => mensalidadeController.listarMensalidades(req, res));
router.post("/mensalidades", (req, res) => mensalidadeController.adicionarMensalidade(req, res));
router.delete("/mensalidades/:id", (req, res) => mensalidadeController.excluirMensalidade(req, res));
router.put("/mensalidades/:id", (req, res) => mensalidadeController.atualizarMensalidade(req, res));

export default router;
