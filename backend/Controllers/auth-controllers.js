const userModel = require("../Models/user-model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SigninController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(409).json({ message: "User Alredy Exist !" });
    }

    if (!name & !email & !password) {
      res.status(400).json({ message: "All Information Required" });
    }

    const newUser = new userModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(200).json({ message: "Signin successful!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "User Not Found by This Email" });
  }
  const isPasswold = await bcrypt.compare(password, user.password);

  if (!isPasswold) {
    res.status(400).json({ message: "Invalid Passwold" });
  }

  const token = await jwt.sign(
    { email: user.email, _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res
    .status(200)
    .json({ token: token, user: user, message: "User Login Succefull" });
};

module.exports = {
  SigninController,
  loginController,
};
