import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import Auth from './Routes/Auth.js'
import Anuncio from "./Routes/Anuncio.js";

import produtos from './Routes/ProdutoRoutes.js'; 
import routes from './Routes/CampanhaRoutes.js'; 
import mensalidadeRoutes from "./Routes/MensalidadeRoutes.js";
import comissaoRoutes from "./Routes/ComissaoRoutes.js"
import frequenciaRoutes from './Routes/FrequenciaRoutes.js';
import associadoRoutes from './Routes/AssociadoRoutes.js'; 
import DoacaoRoutes from "./Routes/DoacaoRoute.js";

const app = express();
const port = 3002;

app.use(cors({
    origin: 'http://localhost:3000' 
}));


app.use(express.json());
app.use(Anuncio);
app.use(Auth);
app.use(produtos)
app.use(routes)
app.use(mensalidadeRoutes);
app.use(comissaoRoutes);
app.use(frequenciaRoutes);
app.use(associadoRoutes);
app.use(DoacaoRoutes);

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
});