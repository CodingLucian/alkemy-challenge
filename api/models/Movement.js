const { DataTypes } = require('sequelize');
const db = require('../db.js');

module.exports = db => {
    db.define('Movement', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true, 
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        operation: {
            type: DataTypes.ENUM("in", "out"),
            allowNull: false,
        },
        details: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.ENUM("food", "taxes", "extras", "work", "rent", "other"),
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        // timestamps: false
    })
}; 