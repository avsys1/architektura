import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./journal.css";
function Journal() {
  const username = useParams().username;
  const id = useParams().id;
  const [entries, setEntries] = useState({
    entries: [],
  });

  const editEntry = async (index) => {
    const newEntry = prompt("Enter new entry");
    await axios
      .patch(
        "http://localhost:8000/journal/entry/" +
          username +
          "/" +
          id +
          "/" +
          index +
          "/" +
          newEntry
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    fetchData();
  };

  const addEntry = async () => {
    const newEntry = prompt("Enter new entry");
    await axios
      .post(
        "http://localhost:8000/journal/entry/" +
          username +
          "/" +
          id +
          "/" +
          newEntry
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    fetchData();
  };

  const deleteEntry = async (index) => {
    await axios
      .delete(
        "http://localhost:8000/journal/entry/" +
          username +
          "/" +
          id +
          "/" +
          index
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    fetchData();
  };

  const fetchData = () => {
    axios
      .get("http://localhost:8000/journal/" + id, {
        params: { username },
      })
      .then((response) => setEntries(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div id="journal">
      <div id="journal__header">
        <Link to="/">
          <button> Back </button>
        </Link>
        <h1>{id} </h1>
        <button onClick={() => addEntry()}> Add new entry </button>
      </div>
      {entries.entries.map((single_entry, index) => (
        <div id="journal__entry">
          <p>
            {single_entry.timestamp} <br />
            {single_entry.entry}
          </p>
          <div id="journal__entry__buttons">
            <button onClick={() => editEntry(index)}> Edit </button>
            <button onClick={() => deleteEntry(index)}> Delete </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Journal;
