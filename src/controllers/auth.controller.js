const connection = require('../db/database');
const jwt = require('jsonwebtoken');

const authCtrl = {};

authCtrl.loginUsuario = async (req, res) => {
    // Genera el TOKEN
    const token = jwt.sign({ id: req.id, username: req.username, rol: req.rol }, process.env.SECRET, {expiresIn: '2h' /*expiresIn: 86400 // 24 horas*/});

    res.status(201).json({ status: 201, error: false, message: '', results:[{token, id: req.id, username: req.username, rol: req.rol}] });    
};

module.exports = authCtrl;