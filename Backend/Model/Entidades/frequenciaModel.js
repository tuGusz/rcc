import db from '../database.js'; // Supondo que você tenha o arquivo de banco de dados configurado como 'db'

const database = new db();


class Frequencia {
   static async registrar(usuarioId, campanhaId) {
        try {
          console.log('Buscando associado com user_id =', usuarioId);

          if (!usuarioId) throw new Error("Usuário não informado");

          const resultado = await database.ExecutaComando(
              'SELECT * FROM associados WHERE user_id = ?',
              [Number(usuarioId)]
            );

            const associados = resultado.rows;

            if (!Array.isArray(associados) || associados.length === 0) {
              throw new Error('Associado não encontrado para o usuário informado');
            }

          const cpfAssociado = associados[0].cpf;

      
          const campanhas = await database.ExecutaComando(
            'SELECT * FROM campanha WHERE c_id = ?',
            [campanhaId]
          );

          const camp = campanhas.rows
          if (!Array.isArray(camp) || camp.length === 0) {
            throw new Error('Campanha não encontrada');
          }

          const result = await database.ExecutaComando(
            'INSERT INTO frequencias (cpf_associado, campanha_id) VALUES (?, ?)',
            [cpfAssociado, campanhaId]
          );

          return {
            id: result?.insertId,
            cpfAssociado,
            campanhaId,
            dataRegistro: new Date()
          };
        } catch (error) {
          console.error("Erro detalhado:", error);
          throw new Error('Erro ao registrar frequência: ' + error.message);
        }
    }
  
 
    static async listarPorCampanha(campanhaId) {
        try {
            // Lista as frequências de acordo com a campanha
            const [rows] = await database.ExecuteComando(
                'SELECT a.cpf, a.nome, f.data_registro ' +
                'FROM frequencias f ' +
                'JOIN associados a ON f.cpf_associado = a.cpf ' +
                'WHERE f.campanha_id = ?',
                [campanhaId]
            );
            return rows;
        } catch (error) {
            throw new Error('Erro ao listar frequências: ' + error.message);
        }
    }

      static async buscarRelatorioPorNomeEPeriodo(nome = '', dataInicio, dataFim, campanhaId) {
  try {
    let query = `
      SELECT 
        a.nome AS nome_associado,
        a.cpf,
        f.data_registro,
        c.c_nome AS nome_campanha
      FROM 
        frequencias f
      JOIN 
        associados a ON f.cpf_associado = a.cpf
      JOIN 
        campanha c ON f.campanha_id = c.c_id
      WHERE 1=1
    `;

    const params = [];

    if (nome && nome.trim() !== '') {
      query += ' AND a.nome LIKE ?';
      params.push(`%${nome.trim()}%`);
    }

    if (dataInicio && dataFim) {
      query += ' AND f.data_registro BETWEEN ? AND ?';
      params.push(dataInicio, dataFim);
    }

    if (campanhaId && campanhaId !== '') {
        query += ' AND c.c_id = ?';
        params.push(Number(campanhaId));  
    }


    query += ' ORDER BY f.data_registro DESC';

    console.log('QUERY:', query);
    console.log('PARAMS:', params);

    const rows = await database.ExecutaComando(query, params);
    return rows;
  } catch (error) {
    throw new Error('Erro ao buscar relatório de frequência: ' + error.message);
  }
}


}

export default Frequencia;
