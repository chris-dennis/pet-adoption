const { Sequelize } = require('sequelize');
const Animal = require('./models/Animal');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

const clearAnimals = async () => {
    try {
        await Animal.destroy({ where: {}, truncate: true });
        console.log('All animals have been deleted');
    } catch (err) {
        console.error('Error deleting animals:', err);
    } finally {
        process.exit();
    }
};

clearAnimals();