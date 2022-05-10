const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('activities', {
    // ID
    // Nombre 
    // Dificultad (Entre 1 y 5)
    // Duración
    // Temporada (Verano, Otoño, Invierno o Primavera)
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
    },
    dificulty: {
        type: DataTypes.STRING,
        defaultValue: "0",
    },
    duration: {
        type: DataTypes.STRING,
        defaultValue: "0",
    },
    season: {
        type: DataTypes.ENUM("summer", "autumn", "winter", "spring", "all"),
        allowNull: false
    }
    // timestamps: false
}); 
};