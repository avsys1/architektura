const express = require("express");
const router = express.Router();
const journal = require("../abl/journal");

router.get("/", (req, res) => {
  res.send("Snažíš se získat journal");
});

router.post("/", (req, res) => {
  res.send("Snažíš se vytvořit journal");
  journal.createJournal(req, res);
});

module.exports = router;
