const express = require("express");
const router = express.Router();
const journal = require("../abl/journal");

router.get("/", (req, res) => {
  journal.getJournal(req, res);
});

router.get("/list", (req, res) => {
  journal.listJournals(req, res);
});

router.get("/list/:id", (req, res) => {
  journal.getListOfUserJournals(req, res);
});

router.post("/", (req, res) => {
  journal.createJournal(req, res);
});

router.post("/write", (req, res) => {
  journal.writeJournal(req, res);
});

module.exports = router;
