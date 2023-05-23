const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://maryna_sk:maryna_sk@cluster0.q2a5cgt.mongodb.net/db_contacts?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
