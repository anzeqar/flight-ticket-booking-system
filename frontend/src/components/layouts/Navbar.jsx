import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Flight Ticket Booking System
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/bookings">
                  Bookings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/book">
                  Book Seats
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/update">
                  Update Seats
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/edit">
                  Cancel Seats
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
