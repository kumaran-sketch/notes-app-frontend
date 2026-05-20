import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const res = await axios.get("http://localhost:3000/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const addNote = async () => {
    if (!text.trim()) return;

    await axios.post("http://localhost:3000/notes", {
      text,
    });

    setText("");

    getNotes();
  };

  return (
    <div className="app">

      <div className="container">

        <div className="header">

          <h1>
            Notes
          </h1>

        </div>

        <div className="inputSection">

          <input
            type="text"
            placeholder="Write a note..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={addNote}>
            Add Note
          </button>

        </div>

        <div className="notesGrid">

          {notes.length === 0 ? (
            <div className="emptyState">
              No notes added
            </div>
          ) : (
            notes.map((note, index) => (
              <div
                key={index}
                className="noteCard"
              >
                {note}
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default App;