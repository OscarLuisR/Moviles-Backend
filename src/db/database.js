const Sequelize = require('sequelize');
const message = require('../lib/message');
const Rol = require('../models/rol.model');
const User = require('../models/user.model');
const Movil = require('../models/movil.model');

// Crea la Conexion
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

const rolModel = Rol(sequelize, Sequelize);
const userModel = User(sequelize, Sequelize);
const movilModel = Movil(sequelize, Sequelize);

userModel.belongsTo(rolModel, {foreignKey: 'id_rol'});

sequelize.sync({force: false})
    .then(()=>{
        console.log('TABLAS SINCRONIZADA');
    });

try {
    console.log(message.ok(` Conectado a la Base de Datos ${process.env.DATABASE} `));
} catch (err) {
    console.log(message.error(` Error: ${err} `));
};

module.exports = {
    rolModel,
    userModel,
    movilModel
};