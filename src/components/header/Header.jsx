import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header-container">
      <button className="header-menu-button">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <h2 className="header-title">
        <Link to="/">Your Places</Link>
      </h2>
      <nav className="nav-bar">
        <Link to="/" exact>
          ALL USERS
        </Link>
        /<Link to="/u1/places">MY PLACE</Link>/
        <Link to="/places/new">ADD PLACE</Link>/
        <Link to="/auth">AUTHENTICATE</Link>
      </nav>
    </header>
  );
};

export default Header;
