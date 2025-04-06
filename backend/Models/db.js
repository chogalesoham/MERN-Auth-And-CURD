const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDb connected successfully");
  })
  .catch((err) => {
    console.log("MongoDb connection failed", err);
  });
