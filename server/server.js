// Importujeme express, který umožňuje vytvořit server
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
// Vytvoříme instanci expressu
const app = express();
// Nastavíme port, na kterém bude server poslouchat
const port = 8000;

const userController = require("./controllers/users");
const journalController = require("./controllers/journal");
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(bodyParser.json());

app.use("/users", userController); // Řeší uživatelské účty
app.use("/journal", journalController); // Řeší zápisky
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
