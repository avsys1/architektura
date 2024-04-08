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
  const id = req.body.userid;
  const filePath = __dirname + "/../data/";

  const userFileName = id + ".json";
  const fullPathToUser = filePath + "/users/" + userFileName;

  if (!fs.existsSync(fullPathToUser)) {
    return res.status(401).send("Zadal jste špatné ID uživatele");
  }

  const fileName = name + ".json";
  const fullPathToJournal = filePath + "/journals/" + fileName;

  const entries = {
    userid: id,
    entries: [
      {
        timestamp: "2021-03-01T12:00:00.000Z",
        entry: "Journal created",
      },
    ],
  };

  if (fs.existsSync(fullPathToJournal)) {
    res.status(409).send("Journal already exists");
  } else {
    fs.writeFileSync(
      fullPathToJournal,
      JSON.stringify(entries, null, 2),
      "utf8"
    );
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
  const name = req.body.name;
  const entry = req.body.entry;
  const id = req.body.userid;

  console.log(name);
  console.log(entry);
  console.log(id);
  const filePath = __dirname + "/../data/";
  const fileName = name + ".json";
  const fullPath = filePath + "journals/" + fileName;

  const userFileName = id + ".json";
  const fullPathToUser = filePath + "users/" + userFileName;

  if (!fs.existsSync(fullPathToUser)) {
    return res.status(401).send("Tento uživatel neexistuje");
  }

  // Create an object to store the entry
  const entryObj = {
    timestamp: new Date().toISOString(),
    entry: entry,
  };

  if (fs.existsSync(fullPath)) {
    const journalData = fs.readFileSync(fullPath, "utf8");

    const updatedData = JSON.parse(journalData);

    if (updatedData.userid !== id) {
      return res
        .status(401)
        .send("You are not authorized to write to this journal");
    }

    updatedData.entries.push(entryObj);

    const entryJSON = JSON.stringify(updatedData, null, 2);
    fs.writeFileSync(fullPath, entryJSON);
    res.status(200).send("Journal entry added successfully");
  } else {
    res.status(404).send("Journal not found");
  }
}

module.exports = { getJournal, createJournal, listJournals, writeJournal };
