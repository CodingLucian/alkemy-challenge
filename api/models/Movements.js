const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

sequelize.define('Movements', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    ingreso: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    egreso: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    balance: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    concepto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.ENUM("comida", "servicios", "extras", "trabajo", "alquileres", "varios"),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    }
    // timestamps: false
}); 
};