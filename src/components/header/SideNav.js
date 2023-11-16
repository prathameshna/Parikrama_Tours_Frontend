import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faCogs,
  faTable,
  faList,
  faUser,
  faStar,
  faCreditCard,
  faBriefcase,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./sidebar.css";

function SideNav({ isAdmin }) {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1180);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1180);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTrigger = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <div className="trigger" onClick={handleTrigger}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>
      <nav className="user-view__menu">
        <div className="side-nav">
          <Link to="/user-profile">
            <FontAwesomeIcon icon={faUser} />
            {isOpen && <p className="text-update">Settings</p>}
          </Link>
        </div>
        <div className="side-nav">
          <Link to="/my-tours">
            <FontAwesomeIcon icon={faBriefcase} />
            {isOpen && <p className="text-update">My bookings</p>}
          </Link>
        </div>
        <div className="side-nav">
          <Link to="/my-reviews">
            <FontAwesomeIcon icon={faStar} />
            {isOpen && <p className="text-update">My reviews</p>}
          </Link>
        </div>
        <div className="side-nav">
          <Link to="#">
            <FontAwesomeIcon icon={faCreditCard} />
            {isOpen && <p className="text-update">Billing</p>}
          </Link>
        </div>
        {isAdmin && (
          <div className="admin-nav">
            {isOpen && <h5 className="admin-nav__heading">Admin</h5>}
            <div className="side-nav">
              <Link to="/manage-tours/2023">
                <FontAwesomeIcon icon={faMap} />
                {isOpen && <p className="text-update">Manage tours</p>}
              </Link>
            </div>
            <div className="side-nav">
              <Link to="/manage-users">
                <FontAwesomeIcon icon={faUser} />
                {isOpen && <p className="text-update">Manage users</p>}
              </Link>
            </div>
            <div className="side-nav">
              <Link to="/manage-reviews">
                <FontAwesomeIcon icon={faStar} />
                {isOpen && <p className="text-update">Manage reviews</p>}
              </Link>
            </div>
            <div className="side-nav">
              <Link to="/manage-bookings">
                <FontAwesomeIcon icon={faBriefcase} />
                {isOpen && <p className="text-update">Manage bookings</p>}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default SideNav;
