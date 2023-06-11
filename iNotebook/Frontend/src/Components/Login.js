import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../Context/NoteContext";
import "./Login.css";

const Login = () => {
  const context1 = useContext(context);
  const { showalert } = context1;

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); //used to prevent the reloading of page
    showalert("Verifying your account", "success");

    const { email, password } = credentials; //destructureing

    const response = await fetch(
      "https://inotebook-server-p2wa.onrender.com/api/auth/login",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const json = await response.json();

    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      showalert("Successfully Logged in !!", "success");
    } else {
      showalert("Invalid Credentials", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="loginmain">
      <div className="login-back-style">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={credentials.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              value={credentials.password}
            />
          </div>
          <div style={{ textAlign: "center", paddingTop: "20px" }}>
            <button type="submit" className="btn btn-dark">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
