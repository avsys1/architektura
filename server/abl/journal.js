const fs = require("fs");

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

/* získáš jméno souboru, pokud existuje, pošleš http 409, pokud neexistuje, vytvoříš ho. */
/**
 * Funkce na získání journalu
 * @param {*} req
 * @param {*} res
 */
function getJournal(req, res) {
  const name = req.query.name;

  /* Logika - Jestli bude existovat ve složce journals soubor, který má jméno podle proměnné name, pošleme mu ho pomocí res.json(soubor).
   * Pokud ne, pošleme mu status 404 a zprávu "Journal not found". */
}
module.exports = { getJournal, createJournal };
