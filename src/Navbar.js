import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="topnav">
      <a className="" href="home">Home</a>
      <a href="about">About</a>
      <div className="signout">
        <a href="/">Sign Out</a>
      </div>
    </div>
  );
}

export default Navbar;

