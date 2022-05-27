const { DataTypes } = require('sequelize');
const db = require('../db.js');

module.exports = db => {
    db.define('RefTkn', {
        reftkn:{
          type: DataTypes.STRING,
          allowNull: false,
        }
    },
    )
}; 