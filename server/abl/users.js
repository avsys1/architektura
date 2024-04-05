const users = require("../data/users.json");

function getUsers(req, res) {
  res.send(users);
}

module.exports = {
  getUsers,
};
