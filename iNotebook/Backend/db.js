const mongoose = require("mongoose");
const mongoURI = process.env.DB_URL;
mongoose.set("strictQuery", true);

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connection Successful");
  });
};

module.exports = connectToMongo;
