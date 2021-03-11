module.exports = (sequelize, DataTypes) => {
    const Rol = sequelize.define('roles', {
        id_rol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'rol can not be null'
                }
            }
        }
    }, {
        timestamps: true,
    });

    return Rol;
};