const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const router = require("./routes/find-products");
const notFound = require("./middlewares/not-found");

const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

//creating routes
app.use("/storeAPI", router);
app.use(notFound);

//connecting to database(async process,so complete first),starting server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
