const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// Database connection
require("./Models/db.js");

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});
app.use("/api/auth", require("./Routes/auth-routes.js"));
app.use("/api", require("./Routes/products-routes.js"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
