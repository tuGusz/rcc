import jwt from 'jsonwebtoken';

const listar = (req, res) => {

    const token = req.header('authorization');
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const tokenLimpo = token.split(' ')[1];
        const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET);
        req.user = decoded ;
        res.status(200).json({ message: 'Rota protegida acessada', user: req.user });
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    } 
}

export default listar 