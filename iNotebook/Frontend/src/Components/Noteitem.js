import React, { useContext } from "react";
import { context } from "../Context/NoteContext";

const Noteitem = (props) => {
  const context1 = useContext(context);
  const { deleteNote } = context1;
  const { note, updatenote, showalert } = props;

  return (
    <div style={{ paddingTop: "100px", width: "70%" }} key={note._id}>
      <div
        className="container"
        style={{
          padding: "20px",
          color: "white",
          boxShadow: "1px 1px 6px 2px white",
        }}
      >
        <div className="d-flex justify-content-between">
          <div>
            <h4 className="card-title">{note.title}</h4>
          </div>
          <div className="d-flex" style={{ marginTop: "2px" }}>
            <div>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteNote(note._id);
                  showalert("Note Deleted !!", "success");
                }}
              ></i>
            </div>
            <div>
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => {
                  updatenote(note);
                }}
              ></i>
            </div>
          </div>
        </div>
        <hr style={{ color: "white" }}></hr>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
};

export default Noteitem;
