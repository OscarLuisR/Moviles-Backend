const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const Movil = sequelize.define('moviles', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Marca can not be null'
                }
            }
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Modelo can not be null'
                }
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Stock can not be null'
                }
            }
        }
    }, {
        timestamps: true,
    });

    sequelizePaginate.paginate(Movil);

    return Movil;
};