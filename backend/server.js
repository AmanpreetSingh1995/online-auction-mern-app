const express = require("express") ;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const MONGODB_URI = `mongodb+srv://${
  process.env.DB_USERNAME
}:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.27sicvx.mongodb.net/${
  process.env.DB_NAME
}?retryWrites=true&w=majority`;

const app = express();

const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, "localhost", () => {
      console.log("Backend is running at port " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
