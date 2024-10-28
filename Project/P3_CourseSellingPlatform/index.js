const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 3000;
const userRouter = require("./route/user");
const adminRouter = require("./route/admin");
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded());

app.use("/user", userRouter);
app.use("/admin", adminRouter);

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Server started at ", PORT);
    });
  } catch (err) {
    console.log(err.message);
  }
}
start();
