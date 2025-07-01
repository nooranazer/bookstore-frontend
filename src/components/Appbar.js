import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Appbar = () => {
   
  const navigate = useNavigate()

  const handleLogout = () => {
       localStorage.removeItem('token')
       localStorage.removeItem('user')
       navigate('/')

  }    

return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-3 text-warning" href="#">
            Book Hive
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav py-3">
              <li className="nav-item">
                <a className="nav-link text-light" href="/list">Home</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link text-light" href="#">Categories</a>
              </li> */}
               <li className="nav-item">
                <a className="nav-link text-light" href="#" onClick={handleLogout}>Logout </a>
              </li>
              <li className="nav-item">
                <Link to={'/viewprofile'} className="nav-link text-light" href="#">profile </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Appbar;
