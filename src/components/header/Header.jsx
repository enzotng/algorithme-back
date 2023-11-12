import React from 'react';
import { Link } from "react-router-dom";

import './Header.scss';

const Header = () => (
  <header>
    <Link to="/" className="logo">
      <span>Complexi<br/>Graph</span>
    </Link>
    <div className="menu">
      <span>Enzo Tang</span>
      <span>MMI 3 Dev</span>
    </div>
  </header>
);

export default Header;