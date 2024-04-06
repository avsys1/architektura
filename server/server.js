// Importujeme express, který umožňuje vytvořit server
const express = require("express");

const bodyParser = require("body-parser");
// Vytvoříme instanci expressu
const app = express();
// Nastavíme port, na kterém bude server poslouchat
const port = 8000;

const userController = require("./controllers/users");
const loginController = require("./controllers/login");
const journalController = require("./controllers/journal");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(bodyParser.json());

app.use("/user", userController); // Řeší uživatelské účty
app.use("/login", loginController); // Řeší přihlašování
app.use("/journal", journalController); // Řeší zápisky
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
