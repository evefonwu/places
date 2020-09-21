import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="header">
      <div className="branding">Project Fullstack GraphQL</div>

      <div className="branding">
        Simple Airbnb-like CRUD (or Query, Mutation) application.
      </div>
      <div className="navigation">
        <Link to="/">Places to Stay</Link>
        <Link to="/create">Add Your Place</Link>
      </div>
    </div>
  );
}

export default Header;
