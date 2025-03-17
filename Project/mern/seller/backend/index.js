const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
// const authRouter = require("./routes/authRoute");
const storeRouter = require("./routes/authRoute");
const notFound = require("./middlewares/notFound");

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", authRouter);
app.use("/store", storeRouter);

app.use(notFound);

// Connecting to database (async process, so complete first), starting server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
