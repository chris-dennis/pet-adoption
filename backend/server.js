const app = require('./app');
const sequelize = require('./config/db');

sequelize.sync().then(() => {
    app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
});