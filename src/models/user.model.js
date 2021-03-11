const { rolModel } = require('../db/database');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'username can not be null'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'email can not be null'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            /* validate: {
                notNull: {
                    msg: 'password can not be null'
                }
            } */
        }
    }, {
        timestamps: true,
    });

    return User;
};