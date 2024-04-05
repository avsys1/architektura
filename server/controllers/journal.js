const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Snažíš se získat journal");
});

router.post("/", (req, res) => {
  res.send("Snažíš se vytvořit journal");
});
module.exports = router;
