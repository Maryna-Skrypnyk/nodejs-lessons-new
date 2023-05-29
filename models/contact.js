const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const patternPhone = /^(?:\+38)?\s?0\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;

// схема і валідація для збереження в базу даних
const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: {
      type: String,
      // required: true
    },
    email: {
      type: String,
      // unique: [true, "bd already includes email"],
      // required: true,
    },
    phone: {
      type: String,
      match: patternPhone,
      // unique: [true, "bd already includes phone"],
      required: true,
    },
    favorite: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError); // при валідації схеми моделі присвоюється вірний статус помилки

const Contact = model("contact", contactSchema);

// схема і валідація при отриманні запиту
const addSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  surname: Joi.string().alphanum(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).required(),
  favorite: Joi.boolean().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().alphanum().optional(),
  surname: Joi.string().alphanum().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).optional(),
  favorite: Joi.boolean().optional(),
}).min(1);

const statusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateSchema,
  statusContactSchema,
};

module.exports = { Contact, schemas };
