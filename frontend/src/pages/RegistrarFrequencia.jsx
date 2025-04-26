import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = "http://localhost:3002";

const RegistrarFrequencia = () => {
    const { campanhaId } = useParams();
    const [associados, setAssociados] = useState([]);
    const [frequencias, setFrequencias] = useState([]);
    const [searchCpf, setSearchCpf] = useState('');
    const [campanha, setCampanha] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // 1. Carrega campanha
                const campanhaResponse = await fetch(`${API_BASE_URL}/campanha/${campanhaId}`);
                if (!campanhaResponse.ok) throw new Error('Erro ao carregar campanha');
                const campanhaData = await campanhaResponse.json();
              
                // Ajuste para corresponder à resposta real da API
                setCampanha({
                    nome: campanhaData.rows[0].c_nome,
                    local: campanhaData.rows[0].c_local,
                    dataInicio: new Date(campanhaData.rows[0].c_data_inicio).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    }),
                });

                // 2. Carrega associados
                const associadosResponse = await fetch(`${API_BASE_URL}/associados`);
                if (!associadosResponse.ok) throw new Error('Erro ao carregar associados');
                const associadoData = await campanhaResponse.json();
                setAssociados(await associadosResponse.json());
            
                console.log("Teste", associadoData); // Verifique o conteúdo retornado aqui
                
                
                
                // 3. Carrega frequências
                const frequenciasResponse = await fetch(`${API_BASE_URL}/frequencia/${campanhaId}`);
                if (!frequenciasResponse.ok) throw new Error('Erro ao carregar frequências');
                setFrequencias(await frequenciasResponse.json());

            } catch (error) {
                console.error("Erro detalhado:", error);
                alert(`Erro ao carregar dados | Não tem campanha: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [campanhaId]);

    const handleRegistrar = async (cpf) => {
        try {
            const response = await fetch(`${API_BASE_URL}/frequencia`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    cpfAssociado: cpf, 
                    campanhaId 
                }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            alert('Presença registrada!');
            
            // Atualiza a lista de frequências
            const updatedResponse = await fetch(`${API_BASE_URL}/frequencia/${campanhaId}`);
            setFrequencias(await updatedResponse.json());

        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (!campanha) return <div>Não foram encontradas nenhuma campanha!</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Registrar Frequência: {campanha.nome}</h2>
            <p>Local: {campanha.local} | Data: {campanha.dataInicio}</p>
            
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Buscar por CPF"
                    value={searchCpf}
                    onChange={(e) => setSearchCpf(e.target.value)}
                    style={{ padding: '8px', width: '300px' }}
                />
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {associados
                    .filter((associado) => 
                        searchCpf === '' || associado.cpf.includes(searchCpf)
                    )
                    .map((associado) => (
                        <li key={associado.cpf} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '10px', width: '150px' }}>
                                {associado.nome} (CPF: {associado.cpf})
                            </span>
                            <button
                                onClick={() => handleRegistrar(associado.cpf)}
                                disabled={frequencias.some((f) => f.cpf === associado.cpf)}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: frequencias.some((f) => f.cpf === associado.cpf) ? '#28a745' : '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                {frequencias.some((f) => f.cpf === associado.cpf) ? 'Presente ✓' : 'Registrar'}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default RegistrarFrequencia;
