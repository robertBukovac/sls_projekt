const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const Routertickets = require('./api/tickets/router')
const RouterSls = require('./api/sls/router')

const app = express();


// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1mb' }));


// Routes
app.use('/api/v1/tickets', Routertickets);
app.use('/api/v1/sls', RouterSls);


// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message} `);
    // Close server & exit process
    server.close(() => process.exit(1));
});

module.exports = app