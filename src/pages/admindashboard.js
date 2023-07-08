import React from "react";
import Nav from "../components/dashnav";
import Sidebar from "../components/dashsidebar";
import "../dashboard.css";
import { useState } from "react";
import Typew from "../components/typewriter";
import Dashusers from "../components/dashusers";
import Dashboard from "../components/dashboard";


function Admindashboard() {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  const [showScreen, setShowScreen] = useState("dashboard");
  const Showdashboard = () => {
    setShowScreen("dashboard");
  };
  const Showusers = () => {
    setShowScreen("users");
  };
  const Showcontent = () => {
    setShowScreen("content");
  };

  return (
    <div className="container-fluid bg-secondary min-vh-100 ">
      <div className="row ">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            {" "}
            <Sidebar
              showdashboard={Showdashboard}
              showusers={Showusers}
              showcontent={Showcontent}
            />{" "}
          </div>
        )}{" "}
        {toggle && <div className="col-4 col-md-2"></div>}
        <div className="col">
          <div className="px-3">
            {" "}
            <Nav toggle={Toggle} />
            {showScreen == "dashboard" ? <Dashboard /> : " "}
            {showScreen == "users" ? <Dashusers /> : " "}
            {showScreen == "content" ? <Typew /> : " "}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Admindashboard;
