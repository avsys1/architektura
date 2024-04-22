const fs = require("fs");
function getUsers(req, res) {
  let users = [];
  const filePath = __dirname + "/../data/users";
  const files = fs.readdirSync(filePath);
  files.forEach((file) => {
    const user = JSON.parse(fs.readFileSync(filePath + "/" + file, "utf8")); // Načteme data uživatele
    users.push(user);
  });
  res.send(users);
}

function createUser(req, res) {
  const firstname = req.body.firstname;
  if (firstname === undefined) res.status(400).send("Chybí jméno uživatele!");
  const characters = "abcdefghijklmnopqrstuvwxyz123456789!*";
  let string = "";
  for (let i = 0; i < 20; i++) {
    string += characters[Math.floor(Math.random() * characters.length)];
  }

  const user = {
    firstname: firstname,
    userid: string,
  };

  const filePath = __dirname + "/../data/users";

  const fileName = firstname + ".json";
  const fullPath = filePath + "/" + fileName;

  if (fs.existsSync(fullPath)) {
    res.status(409).send("User already exists");
  } else {
    fs.writeFileSync(fullPath, JSON.stringify(user, null, 2), "utf8");
    res.status(200).send("Uživatel byl založen! Vaše ID: " + string);
  }
}

module.exports = {
  getUsers,
  createUser,
};
