import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img
            src="https://www.vhv.rs/dpng/d/144-1445791_transparent-movie-marquee-png-flat-movies-icon-png.png"
            width="60"
            height="60"
            alt=""
          ></img>
        </Link>
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link pr-4" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link pr-4" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link pr-4" to="/rentals">
            Rentals
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link pr-4" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link pr-4" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link pr-4" to="/profile">
                {user.name}
                {user.isAdmin && " (Admin)"}
              </NavLink>
              <NavLink className="nav-item nav-link pr-4" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
