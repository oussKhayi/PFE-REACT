import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/post/postProductSlice";

const Dashboard = () => {
  const API_URL = "http://localhost:3030";
  const dispatch = useDispatch();

  const fetchAllProducts = useSelector((state) => state.postProduct);
  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [oFS, setOFS] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/orders`).then(res=>{
      setOrders(res.data)
    })
    axios.get(`${API_URL}/users`).then((res) => {
      setAllUsers(res.data);
    });
    axios.get(`${API_URL}/users?status=online`).then((res) => {
      setOnlineUsers(res.data);
    });
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
    setAllProducts(fetchAllProducts.products);
    const out = allProducts.filter((p) => parseInt(p.stock) === 0);
    console.log(out);
    setOFS(out.length)
  }, []);

  return (
    <div className="container text-light pt-5">
      <h1>the state of store</h1>
      <div className="row mt-5">
        <div className="col-md-10 col-xl-3">
          <div className="card bg-c-yellow order-card  shadow-sm">
            <div className="card-block">
              <h6 className="m-b-20 text-light">Users Count</h6>
              <h2 className="text-right col-12 text-light d-flex justify-content-between">
                <i className="fa fa-user f-left" />
                <span>{allUsers ? allUsers.length : 0}</span>
              </h2>
              <p className="m-b-0">
                Online users
                <span className="f-right">
                  {onlineUsers ? onlineUsers.length : 0}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-10 col-xl-3">
          <div className="card bg-c-green order-card  shadow-sm">
            <div className="card-block">
              <h6 className="m-b-20 text-light">Available Products</h6>
              <h2 className="text-right col-12 text-light d-flex justify-content-between">
                <i className="fa-brands fa-product-hunt" />

                <span>{allProducts.length}</span>
              </h2>
              <p className="m-b-0">
                Out of stock<span className="f-right">{oFS}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-10 col-xl-3">
          <div className="card bg-c-blue order-card  shadow-sm">
            <div className="card-block">
              <h6 className="m-b-20 text-light">Orders Received</h6>
              <h2 className="text-right col-12 text-light d-flex justify-content-between">
                <i className="fa fa-cart-plus f-left" />
                <span>{orders.length}</span>
              </h2>
              <p className="m-b-0">
                Completed<span className="f-right">0</span>
              </p>
            </div>
          </div>
        </div>
        {/* <div className="col-md-10 col-xl-3">
          <div className="card bg-c-pink order-card  shadow-sm">
            <div className="card-block">
              <h6 className="m-b-20 text-light"></h6>
              <h2 className="text-right col-12 text-light d-flex justify-content-between">
                <i className="fa fa-credit-card f-left" />
                <span>486</span>
              </h2>
              <p className="m-b-0">
                Completed Orders<span className="f-right">351</span>
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
