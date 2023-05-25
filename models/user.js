const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const patternEmail = /\S+@\S+.\S+/;

// схема і валідація для збереження в базу даних (mongoose)
const userSchema = new Schema(
  {
    name: { type: String, default: "Guest" },
    email: {
      type: String,
      unique: [true, "bd already includes email"],
      required: [true, "Email is required"],
      match: patternEmail,
      // validate(value) {
      //   const re = /\S+@\S+.\S+/;
      //   return re.test(String(value).toLowerCase());
      // },
    },
    password: {
      type: String,
      // match: patternPassword,
      minlength: 8,
      required: [true, "Password is required"],
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
    .optional(),
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
