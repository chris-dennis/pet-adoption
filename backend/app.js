const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {join} = require("node:path");
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/animals', require('./routes/animals'));
app.use('/api/upload', require('./routes/upload'));
app.use('/uploads', express.static(join(__dirname, 'uploads')));

module.exports = app;