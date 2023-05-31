const { Schema, model } = require("mongoose");
const Joi = require("joi");
const gravatar = require("gravatar"); // для створення тимчасового аватара користувача, якщо користувач не загружає файл з аватар
const { handleMongooseError } = require("../helpers");

const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const patternEmail = /\S+@\S+.\S+/;

// схема і валідація для збереження в базу даних (mongoose)
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      default: "Guest",
    },
    email: {
      type: String,
      unique: [true, "bd already includes email"],
      required: [true, "Email is required"],
      match: patternEmail,
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is required"],
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250" }, true);
      },
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError); // при валідації схеми моделі присвоюється вірний статус помилки

const User = model("user", userSchema);

// схема і валідація при отриманні запиту (Joi)
const signupSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    // .min(ValidLengthContactName.MIN_LENGTH_NAME)
    // .max(ValidLengthContactName.MAX_LENGTH_NAME)
    .required(),
  email: Joi.string().pattern(new RegExp(patternEmail)).required(),
  password: Joi.string().min(8).pattern(new RegExp(patternPassword)).required(),
  //   subscription: Joi.string()
  //     .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
  //     .optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(new RegExp(patternPassword)).required(),
});

const schemas = { signupSchema, loginSchema };

module.exports = { User, schemas };
