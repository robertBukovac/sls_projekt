const Joi = require('joi')

const ticketSchema = Joi.object({
	stake: Joi.number().min(1).max(100000).required(),
	deviceId: Joi.string().required(),
});

module.exports = {ticketSchema}

