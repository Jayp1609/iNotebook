import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../Context/NoteContext";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context1 = useContext(context);
  const { notes, getNotes, editNote, showalert } = context1;

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  //useRef is used to give reference to any specific element
  const ref = useRef(null);

  const refclose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault(); //used to prevent the reloading of page
    //addNote(note.title, note.description, note.tag);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
    showalert("Note Updated !!", "success");
  };
  return (
    <div>
      <AddNotes showalert={showalert} />
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* className="container row my-3" */}
      <div
        style={{
          height: "fit-content",
          paddingTop: "60px",
          backgroundColor: " #121212",
          paddingBottom: "60px",
        }}
      >
        <h1 style={{ textAlign: "center", color: "white" }}>YOUR NOTES</h1>
        {notes.length === 0 && "No notes to display"}
        {notes.map((note) => {
          return (
            <div className="d-flex justify-content-center" key={note._id}>
              <Noteitem
                key={note._id}
                note={note}
                updatenote={updatenote}
                showalert={showalert}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
