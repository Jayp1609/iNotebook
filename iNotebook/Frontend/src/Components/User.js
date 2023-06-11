import { useEffect, useState, useRef, useContext } from "react";
import UserDetails from "./UserDetails";
import { context } from "../Context/NoteContext";

const User = (props) => {
  const refclose = useRef(null);
  const [eduser, setEduser] = useState({
    ename: "",
  });

  const context1 = useContext(context);
  const { getuser, edituser, user, showalert } = context1;

  useEffect(() => {
    getuser();

    // eslint-disable-next-line
  }, []);

  const updateuserbox = (currentDetail) => {
    setEduser({
      ename: currentDetail.name,
    });
  };

  const onChange = (e) => {
    setEduser({ ...eduser, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    edituser(eduser.ename, user._id);
    refclose.current.click();
    showalert("Profile Updated !!", "success");
  };
  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        backgroundSize: "100%",
        width: "100%",
      }}
    >
      <div
        className="d-flex justify-content-center"
        style={{ padding: "100px" }}
      >
        <ul
          style={{
            listStyleType: "none",
            width: "fit-content",
            paddingRight: "50px",
            paddingBottom: "100px",
            backgroundColor: "white",
            boxShadow: "1px 1px 3px 3px rgb(200, 200, 200)",
          }}
        >
          <li>
            <UserDetails key={user._id} user1={user} />
          </li>
          <li>
            <button
              type="button"
              className="btn btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => updateuserbox(user)}
              style={{ marginTop: "30px", marginLeft: "30px" }}
            >
              Edit
            </button>
          </li>
        </ul>
      </div>

      {/* modal for edit  */}
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
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Details
              </h1>
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
                  <label htmlFor="ename" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ename"
                    name="ename"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={eduser.ename}
                    minLength={3}
                    required
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
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
