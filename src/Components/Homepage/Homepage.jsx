import Navbar from "../Navbar/Navbar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
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
      <Navbar users={users} setActiveUser={setActiveUser} />
      <div>
        <h1>Welcome to the Homepage!</h1>
        {journals?.map((journal) => (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{journal.id}</Card.Title>
              <Card.Text></Card.Text>
              <Link to={"/journal/" + journal.id}>
                <Button variant="primary">Go to journal</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Homepage;
