const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers; // перевірка запиту через наявність авторизації
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    // перевіряємо наявність токену, що починається з bearer
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY); // перевірка чи токен створений з потріним ключем
    const user = await User.findById(id); // визначаємо наявність user з таким токеном
    if (!user || !user.token || user.token !== token) {
      // перевірка існування user, токена і того, чи співпадають токени
      next(HttpError(401));
    }
    req.user = user; // до об'єкту запиту додаємо user, який відповідає знайденому
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
