import "bootstrap/dist/css/bootstrap.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../utils/images/prikrama-tours-logo.png";
import { useDispatch, useSelector } from "react-redux";

// Import the entire 'tours' folder using require.context
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const userImage = importAll(require.context("../../utils/images/users"));

function Navbar() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <header>
      <div>
        <Link to="/" className="text-black">
          <img className="navbar-logo" src={logo} alt="Parikrama logo" />
        </Link>
      </div>
      <div>
        <ul className="navbar-nav">
          {userData ? (
            <React.Fragment>
              <li className=" nav-item ">
                <Link className="btn-margin-top btn1" to="/">
                  All Tours
                </Link>
              </li>
              <li className=" nav-item ">
                <Link className="btn-margin-top btn1" to="/top-6-cheap">
                  Top Affordables
                </Link>
              </li>
              <li className="dropdown dropdown-hover">
                <button
                  className=" btn2 btn-transs"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <img
                    src={userImage[`${userData.photo}`]}
                    alt={userData.name}
                    className="card__picture-img-user-nav"
                  />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/user-profile" className="dropdown-item">
                      {userData.name}
                    </Link>
                  </li>
                  <li>
                    <Link to="/user-profile" className="dropdown-item">
                      Settings
                    </Link>
                  </li>
                  <li>
                    {userData.role === "user" && (
                      <Link to="/my-tours" className="dropdown-item">
                        My Bookings
                      </Link>
                    )}
                  </li>
                  <li>
                    {(userData.role === "admin" ||
                      userData.role === "lead-guide") && (
                      <Link to="/add-tour" className="dropdown-item">
                        Add Tours
                      </Link>
                    )}
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="nav-item">
                <Link className="btn1" to="/">
                  All Tours
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn1" to="/top-6-cheap">
                  Top Affordable
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn1" to="/login">
                  Log in
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
