import React, { useContext, useState } from "react";
import { context } from "../Context/NoteContext";

const AddNotes = (props) => {
  const context1 = useContext(context);
  const { addNote } = context1;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault(); //used to prevent the reloading of page
    addNote(note.title, note.description, note.tag);
    props.showalert("Note Added !!", "success");
    setNote({ title: "", description: "", tag: "" });
  };
  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        padding: "20px",
        paddingTop: "100px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>ADD YOUR NOTES HERE</h1>
      <div className="container my-3 d-flex justify-content-center">
        <form className="my-3" style={{ width: "70%" }}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <h4>Title</h4>
            </label>
            <textarea
              style={{
                fontSize: "26px",
              }}
              class="form-control"
              id="title"
              rows="2"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={3}
              value={note.title}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <h4>Description</h4>
            </label>
            <textarea
              style={{
                fontSize: "26px",
              }}
              class="form-control"
              id="description"
              rows="5"
              name="description"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={3}
              value={note.description}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              <h4>Tag</h4>
            </label>
            <input
              style={{
                fontSize: "26px",
              }}
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              aria-describedby="emailHelp"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <div
            className="d-flex justify-content-center my-3"
            style={{ paddingTop: "20px" }}
          >
            <button
              type="submit"
              className="btn btn-dark btn-lg"
              onClick={handleClick}
              disabled={note.title.length < 5 || note.description.length < 5}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
