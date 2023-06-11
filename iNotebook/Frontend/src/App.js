import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useContext } from "react";
import User from "./Components/User";
import { context } from "./Context/NoteContext";

function App() {
  const context1 = useContext(context);
  const { alert } = context1;

  return (
    <div className="App">
      <Router>
        <div className="fixed-top">
          <Navbar />
        </div>

        <div className="App">
          <div
            className="container fixed-top"
            style={{ height: "50px", marginTop: "55px" }}
          >
            <Alert alert={alert} />
          </div>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/user" element={<User />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
