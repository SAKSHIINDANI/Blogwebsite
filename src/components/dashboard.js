import React from "react";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      {" "}
      <div className="row g-3 my-2">
        {" "}
        <div className="col-md-6 p-4">
          {" "}
          <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            {" "}
            <div>
              {" "}
              <h3 className="fs-2">0</h3> <p className="fs-2">Blogs</p>{" "}
            </div>{" "}
            <i className="bi bi-cart-plus p-3 fs-1"></i>{" "}
          </div>{" "}
        </div>{" "}
        <div className="col-md-6 p-4">
          {" "}
          <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            {" "}
            <div>
              {" "}
              <h3 className="fs-2">0</h3> <p className="fs-2"> Paid users</p>{" "}
            </div>{" "}
            <i className="bi bi-currency-dollar p-3 fs-1"></i>{" "}
          </div>{" "}
        </div>{" "}
        <div className="col-md-6 p-4">
          {" "}
          <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            {" "}
            <div>
              {" "}
              <h3 className="fs-2">0</h3> <p className="fs-2">Free users</p>{" "}
            </div>{" "}
            <i className="bi bi-truck p-3 fs-1"></i>{" "}
          </div>{" "}
        </div>{" "}
        <div className="col-md-6 p-4">
          {" "}
          <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            {" "}
            <div>
              {" "}
              <h3 className="fs-2">0</h3> <p className="fs-2">Increase</p>{" "}
            </div>{" "}
            <i className="bi bi-graph-up-arrow p-3 fs-1"></i>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Dashboard;
