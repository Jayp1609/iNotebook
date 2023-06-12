import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../Context/NoteContext";
const Signup = () => {
  const context1 = useContext(context);
  const { showalert } = context1;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); //used to prevent the reloading of page
    showalert("Checking your details", "success");

    //destructuring
    const { name, email, password } = credentials;

    const response = await fetch(
      "https://inotebook-server-p2wa.onrender.com/api/auth/createuser",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);

    //save the auth token and redirect
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      showalert("Account successfully created!!", "success");
    } else {
      showalert("Email address already in use", "danger");
    }
  };
  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line
  }, []);
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div style={{ paddingBottom: "100px" }}>
      <div
        className="container"
        style={{
          marginTop: "100px",
          width: "80%",
          border: "1px solid black",
          padding: "30px",
          paddingBottom: "30px",
          boxShadow: "2px 2px 6px 4px gray",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "center" }}>SIGN UP</h1>
          <div className="mb-3 ">
            <label htmlFor="name" className="form-label">
              <h4>Name</h4>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <p style={{ fontSize: "15px", color: "rgb(255,21,21)" }}>
              (*at least 3 characters required )
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <h4> Email address</h4>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <h4>Password</h4>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              minLength={8}
              required
            />
            <p style={{ fontSize: "15px", color: "rgb(255,21,21)" }}>
              (*at least 8 characters required )
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              <h4>Confirm Password</h4>
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={onChange}
              minLength={8}
              required
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="btn btn-dark btn-lg"
              disabled={
                credentials.password !== credentials.cpassword ||
                credentials.name.length < 3
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
