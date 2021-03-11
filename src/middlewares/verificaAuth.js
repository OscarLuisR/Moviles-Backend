const jwt = require('jsonwebtoken');
const { userModel, rolModel } = require('../db/database');
const authSchema = require('../Schema/auth.schema');
const bcrypt = require('bcryptjs');

const verificaAuth = {};

verificaAuth.verificaDatosLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const { error } = await authSchema.validaSchema.validate(req.body);

        if (error) {
            // VERIFICAR SI LOS ERRORES SON PRODUCIDOS POR LOS CAMPOS EMAIL Y  PASSWORD
            if (error.details[0].context.key == 'email' || error.details[0].context.key == 'password') {
                return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
            }
        }

        // VERIFICAR SI EL EMAIL NO EXISTE EN LA BD
        const user = await userModel.findOne({
            attributes: ['id', 'username', 'password'],
            where: {
                email : email
            },
            include: { 
                model: rolModel,
                attributes: ['rol']
            }
        });

        if (!user) {
            return res.json({ status: 400, error: true, message: 'Acceso DENEGADO', results: "" });
        }

        // VERIFICAR SI EL PASSWORD INTRODUCIDO COINCIDE CON EL DE LA BD    
        const comparacion = await compararPassword(password, user.password);

        if (!comparacion) {
            return res.json({ status: 400, error: true, message: 'Acceso DENEGADO', results: "" });
        }

        // VERIFICAR QUE POSEA UN ROL VALIDO
        if (!user.role.rol) {
            return res.json({ status: 400, error: true, message: 'Rol Invalido, Acceso DENEGADO', results: "" });
        }

        const rol = await rolModel.findOne({ where: {rol: user.role.rol }});

        if (!rol) {
            return res.json({ status: 400, error: true, message: 'Rol Invalido, Acceso DENEGADO', results: "" });
        }

        req.id = user.id;
        req.username = user.username;
        req.rol = user.role.rol;
        
        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

compararPassword = async (passwordRecibido, password) => {
    return await bcrypt.compare(passwordRecibido, password);
};

verificaAuth.verificaToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        // VALIDA QUE LE ENVIEN LA CABECERA
        if (!token) {
            return res.json({ status: 403, error: true, message: 'No Token Provided', results: "" });
        }
    
        // VALIDA QUE EL TOKEN SEA VALIDO
        const decoded = jwt.verify(token, process.env.SECRET);

        req.id = decoded.id;
        req.username = decoded.username;
        req.rol = decoded.rol;
    
        // VALIDA QUE EL USUARIO DEL TOKEN EXISTA
        const user = await userModel.findOne({
            attributes: ['id', 'username'],
            where: {
                id : req.id
            },
            include: { 
                model: rolModel,
                attributes: ['rol']
            }
        });

        if (!user) {
            return res.json({ status: 404, error: true, message: 'Token Invalido', results: "" });
        }

        // VERIFICAR QUE POSEA UN ROL VALIDO
        const rol = await rolModel.findOne({ where: {rol: user.role.rol }});

        if (!rol) {
            return res.json({ status: 405, error: true, message: 'Token Invalido', results: "" });
        }

        // FALATA VERIFICAR LA EXPIRACION DEL TOKEN SI APLICA
    
        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaAuth.verificaPermisoAdmin = async (req, res, next) => {
    if (!req.rol.includes("Admin")) {
        return res.json({ status: 404, error: true, message: 'Requiere Permiso de Administrador', results: "" });
    }

    next();
};

verificaAuth.verificaPermisoUser = async (req, res, next) => {
    if (!req.rol.includes("Admin", "User")) {
        return res.json({ status: 404, error: true, message: 'Requiere Permiso de Usuario', results: "" });
    }

    next();
};

verificaAuth.verificaPermisoGuest = async (req, res, next) => {
    if (!req.rol.includes("Admin", "User", "Guest")) {
        return res.json({ status: 404, error: true, message: 'Requiere Permiso de Invitado', results: "" });
    }
        
    next();
};

module.exports = verificaAuth;