const { SigninController } = require("../Controllers/auth-controllers");

const router = require("express").Router();

router.post("/signin", SigninController);

module.exports = router;
