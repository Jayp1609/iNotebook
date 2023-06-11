import React from "react";

const Alert = (props) => {
  const setprev = (props) => {
    if (props.alert.type === "danger") {
      return "ERROR :";
    } else {
      return "SUCCESS :";
    }
  };
  return (
    <div>
      {props.alert && (
        <div className={`alert alert-${props.alert.type}`} role="alert">
          <b>
            {setprev(props)} {props.alert.msg}
          </b>
        </div>
      )}
    </div>
  );
};

export default Alert;
