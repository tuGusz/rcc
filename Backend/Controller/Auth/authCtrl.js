import jwt from 'jsonwebtoken';
import authServices from "../../Services/userServices.js";
import { User } from "../../Model/Entidades/userModel.js";
import dotenv from 'dotenv';
dotenv.config();
 

export const getCurrentUser = async (req, res) => {
  try {
    const { id } = req.usuario; // extraído do middleware `autenticarToken`

    const user = await User.getUserByEmail(req.usuario.email);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados do usuário" });
  }
};

// Middleware para autenticação via token
export const autenticarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const tokenSemBearer = token.replace('Bearer ', '');  
    const usuarioDecodificado = jwt.verify(tokenSemBearer, process.env.JWT_SECRET);
    req.usuario = usuarioDecodificado;
    next();
  } catch (error) {
    res.status(403).json({ erro: 'Token inválido.' });
  }
};

// Função para login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authServices.login(email, password);
    const user = await authServices.getUserByEmail(email);
    
    res.json({ 
      success: true,
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Erro no login:", error.message);
    // Mantenha a mensagem genérica por segurança
    res.status(401).json({ error: "Credenciais inválidas" });
  }
};

export const createUser = async (req, res) => {
  const { email, nome, password, role, cpf_associado } = req.body;

  if (req.usuario.role !== 'Administrador') {
    return res.status(403).json({ error: "Você não tem permissão para cadastrar novos usuários." });
  }

  try {
    const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }

    const newUser = await authServices.registerUser(nome, email, password, role);

    // Tenta vincular o associado
    if (cpf_associado) {
      try {
        await User.vincularAssociado(cpf_associado, newUser.id);
      } catch (vinculoErro) {
        // Se falhar, deleta o usuário para não deixar lixo
        await User.excluir(newUser.id);
        return res.status(400).json({ error: vinculoErro.message });
      }
    }

    res.status(201).json({ message: "Usuário criado e associado com sucesso" });

  } catch (error) {
    res.status(400).json({ error: "Erro ao salvar o usuário: " + error.message });
  }
};

