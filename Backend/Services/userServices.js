import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../Model/Entidades/userModel.js";

// Função para obter usuário por email
const getUserByEmail = async (email) => {
  const user = await User.getUserByEmail(email);
  if (!user) throw new Error("Usuário não encontrado");
  return user;
};

// Função para cadastrar um novo usuário
const registerUser = async (nome, email, password, role = "Membro") => {
  const userExists = await User.getUserByEmail(email);
  if (userExists) {
    throw new Error("Usuário já cadastrado");
  }

  const password_hash = await bcrypt.hash(password, 10);
  const user = new User({ nome, email, password_hash, role });
  await user.save();
  return user;
};

// Função para realizar o login do usuário
const login = async (email, password) => {
  const user = await User.getUserByEmail(email);

  if (!user) {
    throw new Error("Usuário ou senha incorretos");
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatch) {
    throw new Error("Usuário ou senha incorretos");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, nome: user.nome, role: user.role },
    process.env.JWT_SECRET || "fallbackSecret",
    { expiresIn: "1h" } // Aumentei o tempo de expiração para 1 hora
  );

  return token;
};

export default { 
  login, 
  registerUser,
  getUserByEmail // Exportando a nova função
};