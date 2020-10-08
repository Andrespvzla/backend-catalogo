const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { conexionBd } = require('./database/config');

// Iniciarlizar servidor
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
conexionBd();

//  Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/catalogos', require('./routes/catalogo'));

app.listen(process.env.PORT, () => {
   console.log('Servidor en el puerto ', + process.env.PORT);
});