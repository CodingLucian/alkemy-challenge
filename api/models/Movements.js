const { DataTypes } = require('sequelize');
import db from '../config/db.js';

export const Movement = db.define('movements', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    operation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM("food", "taxes", "extras", "work", "rent", "other"),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    timestamps: false
}); 