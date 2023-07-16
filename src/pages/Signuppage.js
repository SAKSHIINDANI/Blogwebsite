import React from "react";
import "../App.css";
import { useState, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import { useNavigate } from "react-router-dom";
import UserContext from "../components/UserContext";
import { v4 as uuidv4 } from "uuid";
import { customAlphabet } from "nanoid";

const Signuppage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [value, setValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitbuttondisable, setSubmitbuttondisable] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !value.firstname ||
      !value.lastname ||
      !value.email ||
      !value.password
    ) {
      setError("Please fill all the details");
      return;
    }
    setError("");
    setSubmitbuttondisable(true);
    createUserWithEmailAndPassword(auth, value.email, value.password)
      .then(async (res) => {
        setSubmitbuttondisable(false);
        const user = res.user;
        console.log(user);
        await updateProfile(user, {
          displayName: value.firstname + " " + value.lastname,
        });
        setUser(user);
        const { firstname, lastname, email, password } = value;
        const RegistrationDate = new Date().toISOString().split("T")[0];
        const generateShortId = customAlphabet(
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
          6
        );

        // Generate a shorter ID
        const shortId = generateShortId();

        const data = fetch(
          "https://blogwebsite-4e44e-default-rtdb.asia-southeast1.firebasedatabase.app/userdatarecords.json",

          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstname,
              lastname,
              email,
              password,
              id: shortId,
              RegistrationDate,
            }),
          }
        );
        navigate("/home");
      })
      .catch((err) => {
        setSubmitbuttondisable(false);
        setError(err.message);
      });
  };
  return (
    <div className="login">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(event) =>
                  setValue((prev) => ({
                    ...prev,
                    firstname: event.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-3">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(event) =>
                  setValue((prev) => ({
                    ...prev,
                    lastname: event.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(event) =>
                  setValue((prev) => ({ ...prev, email: event.target.value }))
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
            <div className="d-grid">
              <b className="errormsg">{error}</b>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
                disable={submitbuttondisable}
              >
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signuppage;
