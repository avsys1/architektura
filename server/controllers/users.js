const express = require("express");
const { getUsers } = require("../abl/users");
const router = express.Router();

router.get("/users", (req, res) => {
  getUsers(req, res);
});

router.post("/users", (req, res) => {
  //createUser(req, res);
});
module.exports = router;
