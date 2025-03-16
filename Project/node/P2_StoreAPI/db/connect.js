const mongoose = require("mongoose");

//connecting to mongodb database
const ConnectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log({
      error: err.message,
    });
  }
};
module.exports = ConnectDB;
