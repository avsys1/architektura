const fs = require("fs");
const path = require("path");

const filePath = "/../data/journals";
/**
 * Funkce na vytvoření journalu
 * @param {*} req
 * @param {*} res
 */
function createJournal(req, res) {
  const name = req.body.name;
  const filePath = __dirname + "/../data/journals";

  const fileName = name + ".json";
  const fullPath = filePath + "/" + fileName;

  if (fs.existsSync(fullPath)) {
    res.status(409).send("Journal already exists");
  } else {
    fs.writeFileSync(fullPath, "");
    res.status(200).send("Journal created successfully");
  }
}

function getJournal(req, res) {
  const name = req.query.name;
  console.log(name);
  const filePath = __dirname + "/../data/journals";
  const fileName = name + ".json";
  const fullPath = filePath + "/" + fileName;
  if (fs.existsSync(fullPath)) {
    const journalData = fs.readFileSync(fullPath, "utf8");
    res.status(200).send(journalData);
  } else {
    res.status(404).send("Journal not found");
  }
}

function listJournals(req, res) {
  const filePath = path.join(__dirname, "/../data/journals");
  const fileNames = fs
    .readdirSync(filePath)
    .filter((file) => file.endsWith(".json"));
  const journalNames = fileNames.map((fileName) =>
    fileName.replace(".json", "")
  );
  res.status(200).send(journalNames);
}

function writeJournal(req, res) {
  const name = req.query.name;
  const entry = req.body.entry;
  const filePath = __dirname + "/../data/journals";
  const fileName = name + ".json";
  console.log(fileName);
  const fullPath = filePath + "/" + fileName;
  if (fs.existsSync(fullPath)) {
    const journalData = fs.readFileSync(fullPath, "utf8");
    const updatedData = journalData + "\n" + entry;
    fs.writeFileSync(fullPath, updatedData);
    res.status(200).send("Journal entry added successfully");
  } else {
    res.status(404).send("Journal not found");
  }
}

module.exports = { getJournal, createJournal, listJournals, writeJournal };
