const Router = require('express')
const Controllers = require('./controller')

const router = Router();

router
    .get('/', Controllers.getTickets)
    .post('/:id',Controllers.createTicket)
    .get('/:id',Controllers.getTicket)


module.exports = router
