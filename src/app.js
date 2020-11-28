const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const Routertickets = require('./api/tickets/router')
const RouterSls = require('./api/sls/router')
const errorHandler = require('./middleware/error');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(errorHandler);

// Routes
app.use('/api/v1/tickets', Routertickets);
app.use('/api/v1/sls', RouterSls);

module.exports = app