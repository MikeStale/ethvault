const Joi = require('joi')

exports.NoteSchema = Joi.object({
    title:  Joi.string().required(),
    content:  Joi.string().required(),
    creator_id: Joi.string().required(),
    type: Joi.string().valid('reminder', 'comment', 'update').required()
})