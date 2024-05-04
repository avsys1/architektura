const fs = require("fs");
const path = require("path");
const { checkData } = require("../dataValidator/validateData");

const filePath = "/../data/journals";
/**
 * Funkce na vytvoření journalu
 * @param {*} req
 * @param {*} res
 */

function createJournal(req, res) {
  const name = req.body.name;
  const id = req.body.userid;

  if (!checkData([id, name]))
    return res.status(400).send("Your data is missing");

  const filePath = __dirname + "/../data/";

  const userFileName = id + ".json";
  const fullPathToUser = filePath + "/users/" + userFileName;

  if (!fs.existsSync(fullPathToUser)) {
    return res.status(401).send("You are not authorized to create a journal");
  }

  const userFile = fs.readFileSync(fullPathToUser, "utf8");

  const user = JSON.parse(userFile);

  if (user.journals.find((journal) => journal.name == name))
    return res.status(409).send("Journal already exists");

  const journal = {
    name: name,
    entries: [
      {
        timestamp:
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          " " +
          new Date().getDate() +
          "/" +
          new Date().getMonth() +
          "/" +
          new Date().getFullYear(),
        entry: "Journal created",
      },
    ],
  };

  user.journals.push(journal);

  fs.writeFileSync(fullPathToUser, JSON.stringify(user, null, 2), "utf8");

  res.status(200).send("Journal created successfully");
}

function getJournal(req, res) {
  const username = req.query.username;
  const name = req.params.name;

  if (!checkData([username, name]))
    return res.status(400).send("Your data is missing");

  const filePath = __dirname + "/../data/users";
  const fileName = username + ".json";
  const fullPath = filePath + "/" + fileName;
  if (fs.existsSync(fullPath)) {
    const journalData = JSON.parse(
      fs.readFileSync(fullPath, "utf8")
    ).journals.find((journal) => journal.name == name);
    res.status(200).send(journalData);
  } else {
    res.status(404).send("Journal not found");
  }
}

function getListOfUserJournals(req, res) {
  const id = req.params.id;

  if (!checkData([id])) return res.status(400).send("Your data is missing");

  const fullPathToUserFile = __dirname + "/../data/users/" + id + ".json";

  if (fs.existsSync(fullPathToUserFile)) {
    const journals = fs.readFileSync(fullPathToUserFile, "utf8");
    const userJournals = JSON.parse(journals).journals;

    if (userJournals === undefined || userJournals?.length === 0)
      return res.status(204).send("Uživatel nemá žádné zápisky");
    res.send(userJournals);
  } else {
    res.status(404).send("User not found");
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
  /* Destrukturalizace objektu */
  const { entry, name, id } = req.body;

  if (!checkData([entry, name, id]))
    return res.status(400).send("Your data is missing");

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

async function deleteJournal(req, res) {
  /* Destrukturalizace objektu */
  const { username, name } = req.params;

  if (!checkData([username, name]))
    return res.status(400).send("Your data is missing");
  const fullPathUser = __dirname + "/../data/users" + "/" + username + ".json";
  const userFile = fs.readFileSync(fullPathUser, "utf8");

  const user = JSON.parse(userFile);

  user.journals = user.journals.filter((journal) => journal.name != name);

  fs.writeFileSync(fullPathUser, JSON.stringify(user, null, 2), "utf8");

  res.send("Journal deleted successfully");
}

async function editJournal(req, res) {
  /* Destrukturalizace objektu */
  const { username, oldName, newName } = req.params;

  if (!checkData([username, oldName, newName]))
    return res.status(400).send("Your data is missing");

  const fullPathUser = __dirname + "/../data/users" + "/" + username + ".json";
  const userFile = fs.readFileSync(fullPathUser, "utf8");

  const user = JSON.parse(userFile);

  user.journals.find((journal) => journal.name == oldName).name = newName;

  fs.writeFileSync(fullPathUser, JSON.stringify(user, null, 2), "utf8");

  res.send("Journal deleted successfully");
}

const editEntry = (req, res) => {
  /* Destrukturalizace objektu */
  const { username, journalName, entryId, newEntry } = req.params;

  if (!checkData([username, journalName, entryId, newEntry]))
    return res.status(400).send("Your data is missing");

  const fullPathUser = __dirname + "/../data/users" + "/" + username + ".json";
  const userFile = fs.readFileSync(fullPathUser, "utf8");

  const user = JSON.parse(userFile);

  const entry = {
    timestamp:
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      " " +
      new Date().getDate() +
      "/" +
      new Date().getMonth() +
      "/" +
      new Date().getFullYear(),
    entry: newEntry,
  };

  user.journals.find((journal) => journal.name == journalName).entries[
    entryId
  ] = entry;

  fs.writeFileSync(fullPathUser, JSON.stringify(user, null, 2), "utf8");

  res.status(200).send("Successfully edited entry");
};

const deleteEntry = (req, res) => {
  /* Destrukturalizace objektu */
  const { username, journalName, entryId } = req.params;

  if (!checkData([username, journalName, entryId]))
    return res.status(400).send("Your data is missing");

  const fullPathUser = __dirname + "/../data/users" + "/" + username + ".json";
  const userFile = fs.readFileSync(fullPathUser, "utf8");

  const user = JSON.parse(userFile);

  user.journals
    .find((journal) => journal.name == journalName)
    .entries.splice(entryId, 1);

  fs.writeFileSync(fullPathUser, JSON.stringify(user, null, 2), "utf8");

  res.status(200).send("Entry successfully deleted");
};

const addEntry = (req, res) => {
  /* Destrukturalizace objektu */
  const { username, journalName, entry } = req.params;
  console.log(checkData([username, journalName, entry]));
  if (!checkData([username, journalName, entry]))
    return res.status(400).send("Your data is missing");

  const fullPathUser = __dirname + "/../data/users" + "/" + username + ".json";
  const userFile = fs.readFileSync(fullPathUser, "utf8");

  const user = JSON.parse(userFile);

  const finalEntry = {
    timestamp:
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      " " +
      new Date().getDate() +
      "/" +
      new Date().getMonth() +
      "/" +
      new Date().getFullYear(),
    entry: entry,
  };

  user.journals
    .find((journal) => journal.name == journalName)
    .entries.push(finalEntry);
  fs.writeFileSync(fullPathUser, JSON.stringify(user, null, 2), "utf8");

  res.status(200).send("Entry successfully added");
};
module.exports = {
  getJournal,
  createJournal,
  getListOfUserJournals,
  listJournals,
  writeJournal,
  deleteJournal,
  editJournal,
  editEntry,
  deleteEntry,
  addEntry,
};
