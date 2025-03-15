import React from "react";
import { Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Brand Logo */}
        <a className="navbar-brand name" to="/" style={{ color: "rgb(13, 101, 113)"}}>
          Split<span color="red" >IT</span>
        </a>

        {/* Navbar Toggle for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar as */}
        <div className="collapse navbar-collapse navbar" id="navbarNav">
          <ul className="navbar-nav ms-auto navbarlist">
            <li className="nav-item">
              <a className="nav-a element">
                Dashboard
              </a>
            </li>
            <li className="nav-item element">
              <a className="nav-a element" to="">
                Groups
              </a>
            </li>
            <li className="nav-item nav-btn">
              <a className="nav-a btn text-white nav-btn" to="">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
