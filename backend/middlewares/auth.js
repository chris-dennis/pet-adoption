const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    console.log('Received token:', token);
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied' });
        }
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;