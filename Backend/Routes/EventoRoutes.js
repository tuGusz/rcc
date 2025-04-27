import express from 'express';
import EventController from '../Controller/EventController.js';  
import { autenticarToken } from '../Controller/Auth/authCtrl.js';

const router = express.Router();
 
router.post('/criar-evento', autenticarToken, (req, res) => EventController.createEvent(req, res));
router.get('/buscar-evento:id', autenticarToken, (req, res) => EventController.getEventById(req, res));
router.get('/buscar-todos', autenticarToken, (req, res) => EventController.getAllEvents(req, res));
router.put('/atualizar-evento:id', autenticarToken, (req, res) => EventController.updateEvent(req, res));
router.delete('/deletar-evento:id', autenticarToken, (req, res) => EventController.deleteEvent(req, res));

export default router;