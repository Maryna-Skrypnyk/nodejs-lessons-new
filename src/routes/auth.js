const express = require("express");

const {
  signup,
  login,
  logout,
  current,
  updateAvatar,
} = require("../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemas.signupSchema), signup);

router.post("/login", validateBody(schemas.loginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, current);

router.patch("/avatar", authenticate, upload.single("avatar"), updateAvatar); // по маршруту приходить нова аватарка

module.exports = router;
