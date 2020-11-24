const Router = require('express')
const Controllers = require('./controller')

const router = Router();

router
    .post('/:id',Controllers.createSls)
    .get('/:id',Controllers.getSls)
    .get('/',Controllers.getAllSls)
    .delete('/:id',Controllers.deleteSls)
    .put('/:id',Controllers.updateSls)

module.exports = router

