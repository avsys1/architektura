const users = require("../data/users.json");

function getUsers() {
  return users;
}

module.exports = {
  getUsers,
};
