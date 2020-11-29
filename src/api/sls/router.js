const express = require('express');
const router = express.Router();
const Controllers = require('./controller');

router.get('/',Controllers.getAllSls)
router.post('/',Controllers.createSls)
router.get('/:id',Controllers.getSls)
router.delete('/:id',Controllers.deleteSls)
router.put('/:id',Controllers.updateSls)

module.exports = router

