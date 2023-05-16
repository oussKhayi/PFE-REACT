import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <div className="d-flex align-items-center mb-5">
              <i className="fa-solid fa-user-shield me-2" />
              <span className="fs-5 d-none d-sm-inline">Admin</span>
            </div>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item mb-1">
                <Link
                  to="dash"
                  className="nav-link align-middle text-light px-0"
                >
                  <i className="fa-solid fa-gauge" />
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link
                  to="stock"
                  className="nav-link align-middle text-light px-0"
                >
                  <i className="fa-solid fa-table-list" />{" "}
                  <span className="ms-1 d-none d-sm-inline">Stock</span>
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link
                  to="add-products"
                  className="nav-link align-middle text-light px-0"
                >
                  <i className="fa-solid fa-pen-to-square" />
                  <span className="ms-1 d-none d-sm-inline">Insert</span>
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link
                  to="orders"
                  className="nav-link px-0 align-middle text-light"
                >
                  <i className="fa-solid fa-cart-plus" />{" "}
                  <span className="ms-1 d-none d-sm-inline">Orders</span>
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link
                  to="chart"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle text-light "
                >
                  <i className="fa-solid fa-chart-pie" />{" "}
                  <span className="ms-1 d-none d-sm-inline">Chart</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col py-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
