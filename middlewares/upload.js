const multer = require("multer");
const path = require("path");
const { HttpError } = require("../helpers"); // обробка помилок
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const tempDir = path.join(__dirname, "../", UPLOAD_DIR);

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }
    cb(HttpError(400, "Wrong format for avatar"));
  },
});

module.exports = upload;
