const express = require("express");

const { signup, login, logout, current } = require("../controllers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemas.signupSchema), signup);

router.post("/login", validateBody(schemas.loginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, current);

module.exports = router;
