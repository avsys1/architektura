// Importujeme express, který umožňuje vytvořit server
const express = require("express");
// Vytvoříme instanci expressu
const app = express();
// Nastavíme port, na kterém bude server poslouchat
const port = 8000;

// Nastavíme testovací route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
