import React from 'react';
import Managment from '../managment/Managment';
import { Link } from 'react-router-dom';

const Header = ()=>{
    return(
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-5">
      <div className="container">
        <Link className="navbar-brand" to="/">Produktų duomenų bazė</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Pradinis</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Produktų paieška</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacts">Kontaktai</Link>
            </li>
            <li className="nav-item">
              <Managment/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
}

export default Header