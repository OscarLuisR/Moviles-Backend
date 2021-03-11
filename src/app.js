require('dotenv').config();

const express = require('express');
const morgan  = require('morgan');
const cors = require('cors');
const helmet = require("helmet");
const pkgjson = require('../package.json');

// Inicializaciones
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('pkgjson', pkgjson);

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.get('/', (req, res) => {
    res.json({
        App: app.get('pkgjson').name,
        Version: app.get('pkgjson').version,
        Autor: app.get('pkgjson').author,
        Descripcion: app.get('pkgjson').description
    });
});

// Routes
app.use('', require('./routes/index'));

// Exportamos la aplicacion
module.exports = app;