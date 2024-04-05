const { getUsers } = require("../dao/users");

/**
 * Funkce na přihlášení
 * @param {*} req
 * @param {*} res
 */
function login(req, res) {
  const users = getUsers();
  console.log(users);
  if (
    users.users.some(
      (user) =>
        user.username === req.body.username &&
        user.password === req.body.password
    )
  ) {
    res.status(200).send("Logged in");
  } else {
    res.status(401).send("Unauthorized");
  }
}
module.exports = { login };
