import React from "react";

import "bootstrap/js/dist/dropdown";

import "bootstrap/js/dist/collapse";

function Nav({ toggle }) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      {" "}
      <i
        className="navbar-brand bi bi-justify-left fs-4"
        onClick={toggle}
      ></i>{" "}
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>{" "}
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        {" "}
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          {" "}
          <li className="nav-item dropdown">
            {" "}
            <a
              className="nav-link dropdown-toggle text-white"
              href="https://goo.gl/tLl6Dl"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {" "}
              Dropdown{" "}
            </a>{" "}
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              {" "}
              <a className="dropdown-item" href="https://goo.gl/tLl6Dl">
                Profile
              </a>{" "}
              <a className="dropdown-item" href="https://goo.gl/tLl6Dl">
                Setting
              </a>{" "}
              <a className="dropdown-item" href="https://goo.gl/tLl6Dl">
                Logout
              </a>{" "}
            </div>{" "}
          </li>{" "}
        </ul>{" "}
      </div>{" "}
    </nav>
  );
}
export default Nav;
