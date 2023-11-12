// import logo from './logo.svg';
import React from 'react';
import { Link } from "react-router-dom";
import './Footer.scss';

const Footer = () => (
  <footer>
    {/* <div className="navbar-bottom">
      List view
    </div> */}
    <Link to="https://www.enzotang.fr/privacy-policy/" className="logo">
      Mentions légales
    </Link>
    <Link to="https://enzotang.fr" className="logo">
      Enzotang.fr
    </Link>
  </footer>
);

export default Footer;
