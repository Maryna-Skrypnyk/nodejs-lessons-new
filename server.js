const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

let uri = process.env.URI_DB;

mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
