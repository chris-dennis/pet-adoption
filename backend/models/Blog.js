const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Blog.belongsTo(User, { as: 'author' });

module.exports = Blog;
