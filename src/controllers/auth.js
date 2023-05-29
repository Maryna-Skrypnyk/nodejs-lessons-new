const bcrypt = require("bcrypt"); // для хешування паролю в базі даних
const jwt = require("jsonwebtoken"); // для створення і верифікації токену

const { User } = require("../../models/user"); // модель, схема валідації user
const { HttpError, ctrlWrapper } = require("../../helpers"); // обробка помилок

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10); // хешуємо пароль для бази даних
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    status: "success",
    code: 201,
    message: "User created",
    data: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password); // перевіряємо відповідність пароля з паролем, захешованим в базі даних
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" }); // створюєм токен при логіні
  await User.findByIdAndUpdate(user._id, { token }); // оновлюємо токен на новий, якщо він є в базі даних

  res.status(200).json({
    status: "success",
    code: 200,
    message: "User is logged in",
    data: { token },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" }); // очищаємо токен при запиті на logout

  res.status(204).json({});
};

const current = async (req, res) => {
  const { email, name } = req.user;
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Information found",
    data: {
      email,
      name,
    },
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
};
