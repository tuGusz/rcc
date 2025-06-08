import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';   
import api from '../services/api';  
import './RegistrarFrequencia.css';  

export default function RegistrarFrequenciaComponent() {
  const { user } = useContext(AuthContext);  
  const [campanhas, setCampanhas] = useState([]); 
  const [usuarios, setUsuarios] = useState([]);  
  const [selectedCampanha, setSelectedCampanha] = useState(''); 
  const [selectedUsuario, setSelectedUsuario] = useState(user.id); 

  useEffect(() => {
    const fetchCampanhas = async () => {
      try {
        const response = await api.get('/campanhas');
        console.log(response.data);  
        const campanhasData = Array.isArray(response.data.rows) ? response.data.rows : []; 
        setCampanhas(campanhasData);
      } catch (error) {
        console.error('Erro ao buscar campanhas:', error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/usuarios');  
        const usuariosData = Array.isArray(response.data) ? response.data : [];
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchCampanhas();
    if (user.role === 'Administrador') {
      fetchUsuarios();
    }
  }, [user.role]);

  const handleRegistrarFrequencia = async () => {
    if (!selectedCampanha || !selectedUsuario) {
      alert('Selecione uma campanha e um usuário');
      return;
    }

    try {
      const response = await api.post('/frequencia', {
        campanhaId: selectedCampanha,
        usuarioId: selectedUsuario   
      });
      alert('Frequência registrada com sucesso!', response);
    } catch (error) {
      console.error('Erro ao registrar frequência:', error);
      alert('Erro ao registrar a frequência');
    }
 
  };

  return (
    <div style={{ 
        padding: "40px",
    }}> 
        <div className="frequencia-container">
        <h2 className="frequencia-titulo">Registrar Frequência</h2>

        <div className="frequencia-select-container">
            <label htmlFor="campanha" className="frequencia-label">
            Selecione a Campanha:
            </label>
            <select
            id="campanha"
            value={selectedCampanha}
            onChange={(e) => setSelectedCampanha(e.target.value)}
            className="frequencia-select"
            >
            <option value="">Selecione</option>
            {campanhas.length > 0 ? (
                campanhas.map(campanha => (
                <option key={campanha.c_id} value={campanha.c_id}>
                    {campanha.c_nome} - {campanha.c_local}
                </option>
                ))
            ) : (
                <option disabled>Nenhuma campanha disponível</option>
            )}
            </select>
        </div>

        {user.role === 'Administrador' && (
            <div className="frequencia-select-container">
            <label htmlFor="usuario" className="frequencia-label">
                Selecione o Usuário:
            </label>
            <select
                id="usuario"
                value={selectedUsuario}
                onChange={(e) => setSelectedUsuario(e.target.value)}
                className="frequencia-select"
            >
                <option value="">Selecione</option>
                {usuarios.length > 0 ? (
                usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>
                    {usuario.nome} ({usuario.email})
                    </option>
                ))
                ) : (
                <option disabled>Sem usuários disponíveis</option>
                )}
            </select>
            </div>
        )}

        <button onClick={handleRegistrarFrequencia} className="frequencia-button">
            Registrar Frequência
        </button>
        </div>
    </div>
  );
}
