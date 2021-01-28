const Joi = require("joi");

const hostGameSchema = Joi.object({
  gameMasterId: Joi.number(),
  skillMasterId: Joi.number().required(),
  totalPeopleRequired: Joi.number().required(),
  frequencyOfPlay: Joi.string().required(),
  description: Joi.string().required()
});

const joinGameSchema = Joi.object({
  gameId: Joi.number.required(),
  username: Joi.string().required().min(1)
});

const deleteGameSchema = Joi.object({
  gameId: Joi.number().required()
});

module.exports = {
  hostGameSchema,
  joinGameSchema,
  deleteGameSchema
};
