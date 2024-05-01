import Dropdown from "react-bootstrap/Dropdown";
import "./navbar.css";
import { useRef, useState } from "react";
import axios from "axios";
const Navbar = ({
  users,
  setActiveUser,
  activeUser,
  setUsers,
  setJournals,
}) => {
  const newJournalName = useRef(null);
  const addJournal = () => {
    axios
      .post("http://localhost:8000/journal", {
        name: newJournalName.current,
        userid: activeUser.userid,
      })
      .catch((err) => alert(err));
  };

  const showModal = () => {
    newJournalName.current = prompt("Enter journal name");
    addJournal();
    axios
      .get("http://localhost:8000/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8000/journal/list/" + activeUser.userid)
      .then((response) => setJournals(response.data))
      .catch((err) => console.log(err));
  };
  return (
    <nav id="navbar">
      <p> Journal! </p>
      <div id="navbar__login">
        {activeUser?.userid && (
          <button onClick={() => showModal()}> Add Journal </button>
        )}
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Login
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {users.map((user) => (
              <Dropdown.Item onClick={() => setActiveUser(user)} key={user.id}>
                {user.firstname}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
