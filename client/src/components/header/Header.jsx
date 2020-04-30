import React, { useState, useContext } from "react";
import "./Header.css";
// import components
import { NavLink } from "react-router-dom";
import { SideNav } from "../side-nav/SideNav";
import { AuthContext } from "../context/Context";

const Header = () => {
  // react useState hook to manage the sideNavIsOpen state
  const [sideNavIsOpen, setSideNavOpen] = useState(false);
  const openSideNav = () => setSideNavOpen(true);
  const closeSideNav = () => setSideNavOpen(false);
  // useContext Hook to share the authorized state
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      <header className="header-container">
        <button className="header-menu-button" onClick={openSideNav}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h2 className="header-title">
          <NavLink to="/">Time Travel</NavLink>
        </h2>
        <nav className="nav-bar">
          <NavLink to="/" exact>
            ALL USERS
          </NavLink>
          {auth.isLoggedIn && <NavLink to="/u1/places">MY PLACE</NavLink>}
          {auth.isLoggedIn && <NavLink to="/places/new">ADD PLACE</NavLink>}
          {!auth.isLoggedIn && <NavLink to="/auth">LOGIN/SIGNUP</NavLink>}
          {auth.isLoggedIn && <button onClick={auth.logout}>LOG OUT</button>}
        </nav>
      </header>
      {sideNavIsOpen ? <SideNav closeSideNav={closeSideNav} /> : null}
    </React.Fragment>
  );
};

export default Header;
