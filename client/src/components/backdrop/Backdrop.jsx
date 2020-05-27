import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

export const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};
