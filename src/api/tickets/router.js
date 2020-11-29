const express = require('express');
const router = express.Router();
const Controllers = require('./controller');

router.get('/', Controllers.getTickets);
router.get('/:id',Controllers.getTicket);
router.post('/',Controllers.createTicket)


module.exports = router
