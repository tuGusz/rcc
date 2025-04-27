import Frequencia from '../Model/Entidades/frequenciaModel.js';
import { User } from '../Model/Entidades/userModel.js';

class FrequenciaController {
    async registrarFrequencia(req, res) {
        const { campanhaId } = req.body;
        const { role, id: userId } = req.usuario; 
    
        console.log("Registrar Frequencia - req.body:", req.body);
        console.log("Registrar Frequencia - req.usuario:", req.usuario);
        console.log("Registrar Frequencia - role:", role);
    
        try {
          if (role === 'Administrador') {
            console.log("Registrar Frequencia - Administrador pode registrar qualquer frequência");
            const frequencia = await Frequencia.registrar(userId, campanhaId);
            res.status(200).json(frequencia);
          } else if (role === 'Membro') {
            console.log("Registrar Frequencia - Membro só pode registrar a própria frequência");
            const frequencia = await Frequencia.registrar(userId, campanhaId);
            res.status(200).json(frequencia);
          } else {
            console.log("Registrar Frequencia - Permissão negada");
            return res.status(403).json({ message: 'Permissão negada' });
          }
        } catch (error) {
          console.error("Registrar Frequencia - Erro:", error);
          res.status(500).json({ message: error.message });
        }
    }
    
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

    async getAllUsersMeusAmores(req, res) {
        try {
            const usuarios = await User.obterTodos();
            if (!Array.isArray(usuarios)) {
                console.error("Erro: O retorno de obterTodos não é um array:", usuarios);
                return res.status(500).json({ error: 'Erro ao obter usuários' });
            }
            res.status(200).json(usuarios); // Retorna os usuários
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            res.status(500).json({ error: 'Erro ao obter usuários' });
        }
    }
}

export default FrequenciaController;