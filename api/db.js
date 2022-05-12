const { Sequelize, Op } = require('sequelize');
const Movement = require('./models/Movement.js')
require('dotenv').config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env;

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false
});

Movement(db)

module.exports = {
    ...db.models,
    db,
    Op,
};