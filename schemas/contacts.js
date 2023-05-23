const Joi = require("joi");

const patternPhone =
  "^(?:\\+\\s?\\d{1,2}\\s?)?(?:\\(\\d{1,4}\\)|\\d{1,4})?\\s?\\d+([\\-\\s/.]?)(?:\\d\\1?)+(?<=^(?:\\D?\\d\\D?){5,14})\\d$";

const addSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().alphanum().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).optional(),
});

module.exports = { addSchema, updateSchema };
