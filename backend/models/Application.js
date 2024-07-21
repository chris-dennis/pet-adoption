const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Animal = require('./Animal');

const Application = sequelize.define('Application', {
    application_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    }
});

Application.belongsTo(User);
Application.belongsTo(Animal);

module.exports = Application;
