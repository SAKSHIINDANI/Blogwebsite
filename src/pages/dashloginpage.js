import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";
import { useState, useContext } from "react";

import UserContext from "../context/UserContext";

const Dashloginpage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitbuttondisable, setSubmitbuttondisable] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.email || !value.password) {
      setError("Please fill all the details");
      return;
    }
    setError("");
    setSubmitbuttondisable(true);

    // Replace "allowed@example.com" and "allowedpassword" with the allowed email and password
    if (value.email === "indanisakshi903@bla.com" && value.password === "123456") {
      setUser({ email: value.email });
      localStorage.setItem("userdata", JSON.stringify({ email: value.email }));
      navigate("/admindashboard");
    } else {
      setError("Invalid email or password");
      setSubmitbuttondisable(false);
    }
  };

  return (
    <div className="login">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/dashlogin"}>
                  Login
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(event) =>
                  setValue((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(event) =>
                  setValue((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <b className="errormsg">{error}</b>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitbuttondisable}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Forgot <a href="http://www.sample.org/head">password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashloginpage;
