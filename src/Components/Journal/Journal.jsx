import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./journal.css";
function Journal() {
  const id = useParams().id;
  const [entries, setEntries] = useState({
    entries: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/journal", {
        params: {
          name: id,
        },
      })
      .then((response) => setEntries(response.data))
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div id="journal">
      <div id="journal__header">
        <h1>{id} </h1>
        <p> Add new entry </p>
      </div>
      {entries.entries.map((single_entry) => (
        <div id="journal__entry">
          <p>
            {new Date(single_entry.timestamp).toLocaleString()} <br />
            {single_entry.entry}{" "}
          </p>
          <div id="journal__entry__buttons">
            <p> Edit </p>
            <p> Delete </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Journal;
