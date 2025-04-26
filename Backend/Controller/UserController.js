import { User } from '../Model/Entidades/userModel.js'; 
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; 
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET;

//pessoal nao esqueça de configurar aqui 
const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST, //estava usando o mailtrap para capturar os  email para gravar o video
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_EMAIL,  
        pass: process.env.MAILTRAP_PASS,  
    }
});

class UserController {
    async recuperarSenha(req, res) {
        const { email } = req.body;
    
        try {
            const user = await User.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'Email não encontrado.' });
            }
    
            
            const verificationCode = crypto.randomBytes(20).toString('hex');
            console.log("Código gerado:", verificationCode);  
    
            user.reset_password_token = verificationCode;
            user.reset_password_expires = new Date(Date.now() + 3600000);  
            console.log("Usuário antes de salvar:", user); 
            await user.save();
            console.log("Usuário depois de salvar:", user);  
    
           
            const mailOptions = {
                from: 'Mimosa <seuemail@dominio.com>', 
                to: email,
                subject: 'Recuperação de Senha',
                text: `Seu código de verificação é: ${verificationCode}. Este código expira em 1 hora.`,
                html: `<p>Seu código de verificação é: <b>${verificationCode}</b>. Este código expira em 1 hora.</p>`
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Erro ao enviar email:', error);
                    return res.status(500).json({ message: 'Erro ao enviar email. Por favor, tente novamente.' });
                }
                console.log('Email enviado:', info.response);
                res.json({ message: 'Email enviado com sucesso. Verifique sua caixa de entrada.' });
            });
        } catch (error) {
            console.error('Erro ao recuperar senha:', error);
            res.status(500).json({ message: 'Erro ao recuperar senha: ' + error.message });
        }
    }
    

    async verificarCodigo(req, res) {
        const { email, codigo } = req.body;
        
        try {
            const user = await User.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'Email não encontrado.' });
            }

            console.log("Código do banco de dados:", user.reset_password_token);
            console.log("Código do frontend:", codigo);
            if (user.reset_password_token !== codigo) {
                return res.status(400).json({ message: 'Código de verificação inválido.' });
            }

            if (user.reset_password_expires < new Date()) {
                return res.status(400).json({ message: 'Código de verificação expirou.' });
            }

            
            const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
            res.json({ message: 'Código verificado com sucesso.', token });

        } catch (error) {
            console.error('Erro ao verificar código:', error);
            res.status(500).json({ message: 'Erro ao verificar código: ' + error.message });
        }
    }

    async redefinirSenha(req, res) {
        const { token, novaSenha } = req.body;

        try {
            const decoded = jwt.verify(token, secretKey);
            const email = decoded.email;

            const user = await User.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'Email não encontrado.' });
            }

            const hashedPassword = await bcrypt.hash(novaSenha, 10);
            user.password_hash = hashedPassword;
            user.reset_password_token = null; 
            user.reset_password_expires = null; 
            await user.save();

            res.json({ message: 'Senha redefinida com sucesso.' });
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            res.status(500).json({ message: 'Erro ao redefinir senha: ' + error.message });
        }
    }
}

export default new UserController();