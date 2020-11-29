const express = require('express');
const bodyParser = require('body-parser')
//const Routertickets = require('./api/tickets/router')
//const RouterSls = require('./api/sls/router')
const errorHandler = require('./middleware/error');
const pagination = require('./middleware/pagination')

const app = express();

// Middlewares
app.use(pagination)
app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1mb' }));

// Routes
app.use('/api/v1/tickets', require('./api/tickets/router'));
app.use('/api/v1/sls', require('./api/sls/router'));

app.use(errorHandler);

module.exports = app