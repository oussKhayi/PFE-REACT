import React, { useState, useEffect } from "react";
import axios from "axios";
const Orders = () => {
  const API_URL = "http://localhost:3030";
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/orders`).then((res) => {
      setOrders(res.data);
    });
    console.log(orders);
  }, []);

  return (
    <div className="container">
      <h2>orders</h2>
      {orders.map((or, index) => {
        return (
          <article key={index} className="card">
            <header className="card-header d-flex justify-content-between">
              {" "}
              Action <button className="btn-warning btn btn-sm">confirm</button>
            </header>
            <div className="card-body">
              <h6>Order ID: {or.id}</h6>
              <article className="card">
                <div className="card-body row">
                  <div className="col">
                    {" "}
                    <strong>Estimated Delivery time:</strong> <br />
                    {or.order_date}
                  </div>
                  <div className="col">
                    {" "}
                    <strong>Shipping BY:</strong> <br /> {or.user_id}
                  </div>
                  <div className="col">
                    {" "}
                    <strong>Status:</strong> <br />{" "}
                    {or.status ? or.status : "pending"}
                  </div>
                </div>
              </article>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Orders;
