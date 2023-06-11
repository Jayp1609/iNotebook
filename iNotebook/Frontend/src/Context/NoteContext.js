import React, { createContext, useState } from "react";

export const context = createContext();

function NoteContext(props) {
  const host = "https://inotebook-backend-xscgev27vq-el.a.run.app";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const userInitial = [];
  const [user, setUser] = useState(userInitial);

  //Get all notes
  const getNotes = async () => {
    //Api call
    //Search "fetch with headers" on google

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //Api call
    //Search "fetch with headers" on google

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    const note = json;
    setNotes(notes.concat(note)); //.concat() will return new array
  };
  //Delete a note
  const deleteNote = async (id) => {
    //Api call
    //Search "fetch with headers" on google

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit note
  const editNote = async (id, title, description, tag) => {
    //Api call
    //Search "fetch with headers" on google

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  //fetch user information
  const getuser = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setUser(json);
    } catch (err) {
      console.log(err);
    }
  };

  //Edit user
  const edituser = async (name, id) => {
    const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, id }),
    });
    const json = await response.json();
    setUser(json);

    getuser();
  };

  //Display alert
  const [alert, setAlert] = useState(null);

  const showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3500);
  };
  return (
    <context.Provider
      value={{
        notes,
        user,
        setNotes,
        setUser,
        getuser,
        edituser,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        showalert,
        alert,
      }}
    >
      {props.children}
    </context.Provider>
  );
}

export default NoteContext;
