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
    if (activeUser)
      axios
        .get("http://localhost:8000/journal/list/" + activeUser.userid)
        .then((response) => setJournals(response.data.journals))
        .catch((err) => console.log(err));
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
        {journals?.map((journal) => (
          <Link to={"/journal/" + journal.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{journal.id}</Card.Title>
                <div id="card__buttons">
                  <Card.Text>Edit</Card.Text>
                  <Card.Text>Delete</Card.Text>
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
