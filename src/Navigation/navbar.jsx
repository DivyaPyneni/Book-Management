import { NavLink } from "react-router-dom";
import "./navbar.css";



export const Navbar = () => (
  
  <menu className="navbar navbar-expand-lg navbar-light bg-light" data-testid="navbar">
    <li className="navbar-item">
      <NavLink className="navbar-link" to={"/"}>
        Home
      </NavLink>
    </li>
    <li className="navbar-item">
      <NavLink className="navbar-link" to={"/books-management"}>
        Books
      </NavLink>
    </li>
    <li className="navbar-item">
      <NavLink className="navbar-link" to={"/sign-in"}>
        Sign In
      </NavLink>
    </li>
    <li className="navbar-item">
      <NavLink className="navbar-link" to={"/sign-up"}>
        Sign Up
      </NavLink>
    </li>
  </menu>
 
);

