import React, { useState, useContext } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import SideNav from "../side-nav/SideNav";
import { AuthContext } from "../context/Context";

const Header = (props) => {
  const [sideNavIsOpen, setSideNavOpen] = useState(false);
  const openSideNav = () => setSideNavOpen(true);
  const closeSideNav = () => setSideNavOpen(false);
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
          <NavLink to="/">Your Places</NavLink>
        </h2>
        <nav className="nav-bar">
          <NavLink to="/" exact>
            ALL USERS
          </NavLink>
          {auth.isLoggedIn && <NavLink to="/u1/places">MY PLACE</NavLink>}
          {auth.isLoggedIn && <NavLink to="/places/new">ADD PLACE</NavLink>}
          {!auth.isLoggedIn && <NavLink to="/auth">AUTHENTICATE</NavLink>}
          {auth.isLoggedIn && <button onClick={auth.logout}>LOGE OUT</button>}
        </nav>
      </header>
      {sideNavIsOpen ? <SideNav closeSideNav={closeSideNav} /> : null}
    </React.Fragment>
  );
};

export default Header;
