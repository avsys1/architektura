const express = require("express");
const router = express.Router();
const journal = require("../abl/journal");

router.get("/", (req, res) => {
  journal.getJournal(req, res);
});

router.get("/list", (req, res) => {
  journal.listJournals(req, res);
});

router.post("/", (req, res) => {
  journal.createJournal(req, res);
});

module.exports = router;
