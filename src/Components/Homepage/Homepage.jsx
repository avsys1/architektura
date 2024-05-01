import Navbar from "../Navbar/Navbar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./homepage.css";
const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [journals, setJournals] = useState([]);

  function loadJournals() {
    axios
      .get("http://localhost:8000/journal/list/" + activeUser.userid)
      .then((response) => setJournals(response.data))
      .catch((err) => console.log(err));
  }
  const deleteJournal = (journal_id) => {
    axios
      .delete(
        "http://localhost:8000/journal/" + activeUser.userid + "/" + journal_id
      )
      .then((response) => loadJournals())
      .catch((err) => console.log(err));
  };

  const editJournal = (name) => {
    const newName = prompt("Enter new name");
    axios
      .put(
        "http://localhost:8000/journal/rename/" +
          activeUser.userid +
          "/" +
          name +
          "/" +
          newName
      )
      .then((response) => loadJournals())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (activeUser) {
      console.log(`Active user is ${activeUser.firstname}`);
    }
  });

  useEffect(() => {
    if (activeUser) loadJournals();
  }, [activeUser]);
  return (
    <>
      <Navbar
        users={users}
        setUsers={setUsers}
        setActiveUser={setActiveUser}
        activeUser={activeUser}
        setJournals={setJournals}
      />
      <div id="homepage">
        {journals?.length > 0 &&
          journals?.map((journal) => (
            <Link to={"/journal/" + activeUser.userid + "/" + journal.name}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{journal.name}</Card.Title>
                  <div id="card__buttons">
                    <Card.Text
                      onClick={(e) => {
                        e.preventDefault();
                        editJournal(journal.name);
                      }}
                    >
                      Edit
                    </Card.Text>
                    <Card.Text
                      onClick={(e) => {
                        e.preventDefault();
                        deleteJournal(journal.name);
                      }}
                    >
                      Delete
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Homepage;
