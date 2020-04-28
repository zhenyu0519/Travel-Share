import React from "react";
import "./SideNav.css";
// import react route
import { NavLink } from "react-router-dom";

export const SideNav = ({ closeSideNav }) => {
  return (
    <nav className="side-nav">
      <button className="closebtn" onClick={closeSideNav}>
        &times;
      </button>
      <NavLink to="/" exact>
        ALL USERS
      </NavLink>
      <hr />
      <NavLink to="/u1/places">MY PLACE</NavLink>
      <hr />
      <NavLink to="/places/new">ADD PLACE</NavLink>
      <hr />
      <NavLink to="/auth">LOGIN/SIGNUP</NavLink>
    </nav>
  );
};
