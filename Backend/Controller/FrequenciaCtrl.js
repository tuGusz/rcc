import Frequencia from '../Model/Entidades/FrequenciaModel.js';

class FrequenciaController {
    // Registrar uma nova frequência
    async registrarFrequencia(req, res) {
        const { cpfAssociado, campanhaId } = req.body;
        try {
            const frequencia = await Frequencia.registrar(cpfAssociado, campanhaId);
            res.status(201).json(frequencia);
        } catch (error) {
            console.error('Erro ao registrar frequência:', error);
            res.status(400).json({ error: error.message });
        }
    }

    // Listar frequências por campanha
    async listarFrequencias(req, res) {
        const { campanhaId } = req.params;
        try {
            const frequencias = await Frequencia.listarPorCampanha(campanhaId);
            res.status(200).json(frequencias);
        } catch (error) {
            console.error('Erro ao listar frequências:', error);
            res.status(400).json({ error: error.message });
        }
    }
}

export default FrequenciaController;
