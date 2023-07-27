import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../App.css";
import { useState, useContext, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../config/firebaseconfig";
import UserContext from "../components/UserContext";

const Loginpage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitbuttondisable, setSubmitbuttondisable] = useState(false);

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.email || !value.password) {
      setError("Please fill all the details");
      return;
    }
    setError("");
    setSubmitbuttondisable(true);
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then(async (res) => {
        setSubmitbuttondisable(false);
        const userEmail = res.user.email;

        // Fetch user data from the database
        const db = getDatabase();
        const usersRef = ref(db, "userdatarecords");
        get(usersRef).then((snapshot) => {
          const data = snapshot.val();

          if (data) {
            // Convert the object of users into an array
            const usersArray = Object.values(data);

            // Filter the usersArray based on the email of the user
            const filteredUsersArray = usersArray.filter(
              (user) => user.email === userEmail
            );

            // Check if a user with the provided email exists
            if (filteredUsersArray.length > 0) {
              // Set the user based on the filtered user information
              setUser(filteredUsersArray[0]);
              localStorage.setItem(
                "userdata",
                JSON.stringify(filteredUsersArray[0])
              );
              navigate("/home");
            } else {
              setError("User with provided email not found");
            }
          }
        });
      })
      .catch((err) => {
        setSubmitbuttondisable(false);
        setError(err.message);
      });
  };

  return (
    <div className="login">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>
                  Sign up
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
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
