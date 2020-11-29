const Joi = require('joi')

const slsSchema = Joi.object({
    timeDuration: Joi.number().required().min(5).max(1440),
    stakeLimit: Joi.number().required().min(1).max(100000),
    hotPercentage: Joi.number().required().min(1).max(99),
    restrictionExpires: Joi.number().required().min(0),
    deviceId: Joi.string().required(),
})

module.exports = {slsSchema}
