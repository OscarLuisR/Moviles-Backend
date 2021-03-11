const joi = require('joi');
const message = require('../lib/message');

const movilSchema = {};

//movilSchema.statics.validaSchema = joi.object({
movilSchema.validaSchema = joi.object({
    marca: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Marca";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Marca Valido";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    modelo: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe ingresar un Modelo";                        
                        break;
                    case "string.empty":                        
                        err.message = "Debe ingresar un Modelo Valido";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    stock: joi.number()
        .integer()
        .min(0)
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Stock";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Stock Valido";                                             
                        break;
                    case "number.base":
                        err.message = "El Stock debe ser un numero Entero Valido";                                             
                        break;
                    case "number.min":
                        err.message = "El Stock debe tener valores Positivos";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        })
});

module.exports = movilSchema;
