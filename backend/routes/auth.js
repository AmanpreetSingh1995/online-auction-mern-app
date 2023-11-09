const express = require("express");

const { postSignup, postLogin} = require("../controllers/auth");

const router = express.Router();

router.post("/signup", postSignup);
router.post("/login", postLogin);

module.exports = router;
