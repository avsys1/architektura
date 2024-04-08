const express = require("express");
const { getUsers, createUser } = require("../abl/users");
const router = express.Router();

router.get("/", (req, res) => {
  getUsers(req, res);
});

router.post("/", (req, res) => {
  createUser(req, res);
});
module.exports = router;
