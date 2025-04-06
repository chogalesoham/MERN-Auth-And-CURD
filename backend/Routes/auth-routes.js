const {
  SigninController,
  loginController,
} = require("../Controllers/auth-controllers");

const router = require("express").Router();

router.post("/signin", SigninController);
router.post("/login", loginController);

module.exports = router;
