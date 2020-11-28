const express = require('express');
const router = express.Router();
const Controllers = require('./controller');

router.get('/', Controllers.getTickets);
router.get('/:id',Controllers.getTicket);
router.post('/:id',Controllers.createTicket)


module.exports = router


/* 
Zbog nekog cudnog razloga jest mi je izbacivao error na ovaj ljepsi kod.
Morao sam ga drugacije napisati (iznad)

const Router = require('express')
const Controllers = require('./controller')

const router = Router();

router
    .get('/', Controllers.getTickets)
    .post('/:id',Controllers.createTicket)
    .get('/:id',Controllers.getTicket)
*/