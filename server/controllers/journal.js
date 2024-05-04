const express = require("express");
const router = express.Router();
const journal = require("../abl/journal");

router.get("/:name", (req, res) => {
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

router.delete("/:username/:name", (req, res) => {
  journal.deleteJournal(req, res);
});

router.put("/rename/:username/:oldName/:newName", (req, res) => {
  journal.editJournal(req, res);
});

router.patch("/entry/:username/:journalName/:entryId/:newEntry", (req, res) => {
  journal.editEntry(req, res);
});

router.delete("/entry/:username/:journalName/:entryId", (req, res) => {
  journal.deleteEntry(req, res);
});

router.post("/entry/:username/:journalName/:entry", (req, res) => {
  journal.addEntry(req, res);
});

module.exports = router;
