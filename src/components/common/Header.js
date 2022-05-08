import React from "react";
import { NavLink } from "react-router-dom";
import { color } from "./palette";

const Header = () => {
  const activeStyle = { color: color.paleViolet };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;
