import Event from '../Model/Entidades/Eventos.js';  
//Aqui o admin vai poder criar as reuniões 
class EventController {
  async createEvent(req, res) {
    try {
      const eventData = {
        ...req.body,
        criado_por: req.usuarioId, 
      };
      const newEvent = await Event.createEvent(eventData);
      res.status(201).json(newEvent);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      res.status(500).json({ message: 'Erro ao criar evento: ' + error.message });
    }
  }

  async getEventById(req, res) {
    try {
      const event = await Event.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Evento não encontrado.' });
      }
      res.json(event);
    } catch (error) {
      console.error('Erro ao buscar evento:', error);
      res.status(500).json({ message: 'Erro ao buscar evento: ' + error.message });
    }
  }

  async getAllEvents(req, res) {
    try {
      const events = await Event.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error('Erro ao listar eventos:', error);
      res.status(500).json({ message: 'Erro ao listar eventos: ' + error.message });
    }
  }

  async updateEvent(req, res) {
    try {
      const eventData = {
        ...req.body,
        atualizado_por: req.usuarioId, 
      };
      const updatedEvent = await Event.updateEvent(req.params.id, eventData);
      if (!updatedEvent) {
        return res.status(404).json({ message: 'Evento não encontrado.' });
      }
      res.json(updatedEvent);
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      res.status(500).json({ message: 'Erro ao atualizar evento: ' + error.message });
    }
  }

  async deleteEvent(req, res) {
    try {
      const deleted = await Event.deleteEvent(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Evento não encontrado.' });
      }
      res.status(204).send();  
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      res.status(500).json({ message: 'Erro ao deletar evento: ' + error.message });
    }
  }
}

export default new EventController();