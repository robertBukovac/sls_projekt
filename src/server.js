/*
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
const Routertickets = require('./api/tickets/router')
const RouterSls = require('./api/sls/router')



class Server {
  constructor() {
    this.server = express();
  }

  setMiddlewares() {
    this.server.use(morgan('dev'));
    this.server.use(cors());
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json({ limit: '1mb' }));
    
  }

  setRouters() {
    this.server.use('/api/v1/tickets', Routertickets);
    this.server.use('/api/v1/sls', RouterSls);
  }

  start(port) {
    this.server.listen(port, () => {
      this.setMiddlewares();
      this.setRouters();
      console.log(`Server listening on port ${port}`);
    });
  }
}

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message} `);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = Server;
*/
/*

INSERT INTO sls_device (
  "id",
  "city"
) VALUES 
  ('3c144f2f-bc35-4ecd-8fa3-b2a9f012c284','travnik'), 
  ('2ceac662-9d52-4ddd-bf05-7ec04818615e','mostar');

INSERT INTO sls_sls (
  "deviceId",
  "timeDuration",
  "stakeLimit",
  "hotPercentage",
  "restrictionExpires"
) VALUES 
  ('3c144f2f-bc35-4ecd-8fa3-b2a9f012c284',30, 100, 75, 15), 
  ('2ceac662-9d52-4ddd-bf05-7ec04818615e',20, 150, 80, 15);

INSERT INTO sls_ticket (
  "deviceId",
  "stake",
  "timestamp"
) VALUES 
  ('2ceac662-9d52-4ddd-bf05-7ec04818615e',200, NOW());

 ALTER TABLE sls_sls ADD CONSTRAINT unique_device_id UNIQUE ("deviceId");
  */