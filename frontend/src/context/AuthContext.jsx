import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/api/me');
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      logout();
    } finally {
      setLoading(false);  
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/api/login', credentials);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        await fetchUser();  
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.error || 'Erro ao fazer login');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // 👇 Adicionado: funções para verificar papel do usuário
  const isAdmin = () => user?.role === 'Administrador';
  const isModerator = () => user?.role === 'Moderador';
  const isMember = () => user?.role === 'Membro';
  const hasRole = (role) => user?.role === role;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      isAdmin,
      isModerator,
      isMember,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
