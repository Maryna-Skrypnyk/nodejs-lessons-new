const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");
const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
