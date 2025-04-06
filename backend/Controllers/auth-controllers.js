const SigninController = async (req, res) => {
  try {
    res.status(200).json({ message: "Signin successful!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  SigninController,
};
