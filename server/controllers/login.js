const express = require("express");
const router = express.Router();
const { login } = require("../abl/login");

router.post("/", (req, res) => {
  login(req, res);
});

module.exports = router;
