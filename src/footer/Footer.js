import "./footer.css";
import React from "react";
import logo from "./../images/parikrama_footer_img.jpg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <React.Fragment>
      <footer className="footer">
        <div className="footer__logo">
          <img src={logo} alt="Parikrama logo" />
        </div>
        <ul className="footer__nav">
          <li>
            <Link to="#">About us</Link>
          </li>
          <li>
            <Link to="#">Download apps</Link>
          </li>
          <li>
            <Link to="#">Become a guide</Link>
          </li>
          <li>
            <Link to="#">Careers</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
        </ul>
        <p className="footer__copyright">&copy; by Prathamesh Nadhe</p>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
