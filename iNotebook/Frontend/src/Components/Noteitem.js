import React, { useContext, useState, useRef } from "react";
import { context } from "../Context/NoteContext";
import "./Noteitem.css";

const Noteitem = (props) => {
  const context1 = useContext(context);
  const { deleteNote } = context1;
  const { note, updatenote, showalert } = props;
  const [display, setDisplay] = useState("none");
  const refclose = useRef(null);

  const clickopen = () => {
    setDisplay("block");
  };
  const clickclose = () => {
    setDisplay("none");
  };

  return (
    <div style={{ paddingTop: "100px", width: "70%" }} key={note._id}>
      {/* modal */}
      <div
        className="modal"
        style={{
          display: `${display}`,
          paddingTop: "200px",
          width: "100%",
          backgroundColor: "rgb(0,0,0,0.4)",
        }}
      >
        {/* Modal content */}
        <div className="d-flex justify-content-center">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "200px",
              width: "90%",
            }}
          >
            <div className="modal-content">
              <span
                className="close"
                onClick={clickclose}
                ref={refclose}
                style={{ fontSize: "1px" }}
              >
                &times;
              </span>
              <h3 style={{ textAlign: "center", paddingTop: "50px" }}>
                Are you sure you want to delete a note?
              </h3>
              <form className="Edit-Hospitaldetails">
                <div className="d-flex justify-content-center">
                  <div style={{ padding: "20px" }}>
                    <button
                      className="btn btn-outline-success btn-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteNote(note._id);
                        showalert("Note Deleted !!", "success");
                        refclose.current.click();
                      }}
                    >
                      <b>Yes</b>
                    </button>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <button
                      className="btn btn-outline-danger btn-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        refclose.current.click();
                      }}
                    >
                      <b>No</b>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Notes-card */}
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
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => {
                  updatenote(note);
                }}
              ></i>
            </div>{" "}
            <div style={{ paddingLeft: "10px" }}>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  clickopen();
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
