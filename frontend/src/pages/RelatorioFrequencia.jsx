// frontend/src/pages/RelatorioFrequencia.jsx
import React, { useState } from 'react';
import RelatorioFrequenciaService from '../services/FrequenciaEventos';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 


export default function RelatorioFrequencia() {
  const [nome, setNome] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [relatorio, setRelatorio] = useState([]);

    const buscar = async () => {
        try {
            const dados = await RelatorioFrequenciaService.buscarRelatorio({ nome, dataInicio, dataFim });
            console.log("DEBUG envio:", { nome, dataInicio, dataFim });
            console.log('Retorno da API:', dados);
            setRelatorio(dados.rows); // <- Aqui está a diferença!
        } catch (err) {
            console.error("Erro ao buscar relatório:", err.message);
        }
    };

const exportarPDF = () => {
  const doc = new jsPDF();
  doc.text("Relatório de Frequência", 14, 16);

  const data = Array.isArray(relatorio) ? relatorio : [];

  doc.autoTable({
    startY: 20,
    head: [['Associado', 'Campanha', 'Data']],
    body: data.map(r => [
      r.nome_associado || 'Sem nome',
      r.nome_campanha || 'Sem campanha',
      new Date(r.data_registro).toLocaleDateString()
    ])
  });

  doc.save("relatorio_frequencia.pdf");
};



  return (
    <div>
      <h2>Relatório de Frequência</h2>
      <input type="text" placeholder="Nome do associado" value={nome} onChange={e => setNome(e.target.value)} />
      <input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} />
      <input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} />
      <button onClick={buscar}>Buscar</button>
      <button onClick={exportarPDF}>Exportar PDF</button>
      <ul>
        {(Array.isArray(relatorio) ? relatorio : []).map((r, idx) => (
            <li key={idx}>
            {r.nome_associado} - {r.nome_campanha} - {new Date(r.data_registro).toLocaleDateString()}
            </li>
        ))}
     </ul>

    </div>
  );
}
