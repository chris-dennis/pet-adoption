const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Animal = sequelize.define('Animal', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    size: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    image_url: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'available'
    }
});

module.exports = Animal;