const { verificaDatosLogin, verificaToken, verificaPermisoAdmin, verificaPermisoUser, verificaPermisoGuest } = require('./verificaAuth');
const { verificaDatosRegistroMovil, verificaDatosUpdateMovil, verificaParametrosPaginacion } = require('./verificaMovil');

module.exports = {
    verificaDatosLogin,
    verificaToken,
    verificaPermisoAdmin, 
    verificaPermisoUser,
    verificaPermisoGuest,
    verificaDatosRegistroMovil, 
    verificaDatosUpdateMovil,
    verificaParametrosPaginacion
};