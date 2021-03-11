const { Router } = require('express');
const routes = Router();

// Routes
routes.use('/api/auth', require('./auth.routes'));
routes.use('/api/moviles', require('./moviles.routes'));

module.exports = routes;