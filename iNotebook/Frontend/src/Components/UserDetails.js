import React from "react";

const UserDetails = (props) => {
  const { user1 } = props;
  return (
    <div style={{ paddingTop: "40px" }}>
      <ul style={{ listStyleType: "none", paddingTop: "20px" }}>
        <li style={{ paddingBottom: "30px" }}>
          <h1 style={{ textAlign: "center" }}>User's Profile</h1>
        </li>
        <li style={{ fontSize: "30px" }}>
          <b>Name </b>
        </li>
        <li style={{ fontSize: "30px" }}>{user1.name}</li>
        <li style={{ fontSize: "30px", paddingTop: "30px" }}>
          <b>Email </b>
        </li>
        <li style={{ fontSize: "30px" }}>{user1.email}</li>
      </ul>
    </div>
  );
};

export default UserDetails;
