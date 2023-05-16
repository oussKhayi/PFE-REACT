import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import logo from "../logo.png";
import { addItem } from "../features/cart/cartSlice";
import { favItem, unfavorite } from "../features/favorite/favSlice";

const ShowProduct = (props) => {
  const [user, loading] = useAuthState(auth);
  const productProps = props ? props.product : null;
  const propsId = props ? props.id : null;
  const API_URL = "http://localhost:3030";
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      await axios
        .get(`${API_URL}/favorite?user_id=${user.email}`)
        .then((res) => {
          res.data[0] ? setFavorite(res.data[0].items) : console.log(res.data);
          return res.data;
        });
    };
    !loading && fetchAll();
  }, [loading]);

  function manageFav(props) {
    if (!loading && user) {
      if (!favorite.includes(props.id)) {
        dispatch(favItem({ user_email: user.email, product_id: props.id }));
      } else {
        dispatch(unfavorite({ user_email: user.email, product_id: props.id }));
      }
    } else if (!loading && !user) {
      alert("log in first");
    }
  }

  useEffect(() => {
    const fetchAll = async () => {
      await axios
        .get(`${API_URL}/products/${id ? id : propsId}`)
        .then((res) => {
          setProduct(res.data);

          return res.data;
        });
    };
    !productProps && fetchAll();
  }, []);

  return (
    <>
      {product ? (
        product.name ? (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-2" key={product.id}>
            <div className="card">
              <div className="d-flex justify-content-between p-3">
                <p className="lead mb-0" style={{ fontSize: "15px" }}>
                  {product.description}
                </p>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center shadow-1-strong p-0 mb-0"
                  style={{
                    width: "35px",
                    height: "35px",
                    backgroundColor: "#efefef",
                  }}
                  onClick={() => manageFav({ id: product.id })}
                >
                  {favorite.includes(product.id) ? (
                    <i className="fs-5 fas fa-heart text-danger"></i>
                  ) : (
                    <i className="fs-5 fas fa-heart text-secondary"></i>
                  )}
                </div>
              </div>
              
              <img src={product.image} alt={product.name} />
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="small">
                    <a
                      href={`/category/${product.category}`}
                      className="text-muted"
                    >
                      Category : {product.category.toUpperCase()}
                    </a>
                  </p>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="mb-0">{product.name}</h5>
                  <p className="text-dark mb-0 fw-bolder">
                    {parseFloat(product.price).toFixed(2)} $
                  </p>
                </div>
                <div className="acard-footer row d-flex justify-content-around">
                  <button className="btn btn-outline-info btn-sm col-sm-10 col-md-10 col-lg-5 mt-1">
                    view product
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm col-sm-10 col-md-10 col-lg-5 mt-1"
                    onClick={(e) =>
                      dispatch(
                        addItem({
                          user_email: user ? user.email : "",
                          product_id: product.id,
                        })
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : productProps ? (
          <div
            className="col-sm-6 col-md-4 col-lg-3 mb-2"
            key={productProps.id}
          >
            <div className="card">
              <div className="d-flex justify-content-between p-3">
                <p className="lead mb-0" style={{ fontSize: "15px" }}>
                  {productProps.description}
                </p>
                <button
                  onClick={() => manageFav({ id: productProps.id })}
                  className="rounded-circle d-flex align-items-center justify-content-center shadow-1-strong p-0 mb-0"
                  style={{
                    border: "0px",
                    width: "35px",
                    height: "35px",
                    backgroundColor: "#efefef",
                  }}
                >
                  {favorite.includes(productProps.id) ? (
                    <i className="fs-5 fas fa-heart text-danger"></i>
                  ) : (
                    <i className="fs-5 fas fa-heart text-secondary"></i>
                  )}
                </button>
              </div>
              <img
                src={productProps.image}
                // src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp"
                className="card-img-top"
                alt="Laptop"
              />
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="small">
                    <a
                      href={`/category/${productProps.category}`}
                      className="text-muted"
                    >
                      Category : {productProps.category.toUpperCase()}
                    </a>
                  </p>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="mb-0">{productProps.name}</h5>
                  <p className="text-dark mb-0 fw-bolder">
                    {parseFloat(productProps.price).toFixed(2)} $
                  </p>
                </div>
                <div className="row d-flex justify-content-around">
                  <button className="btn btn-outline-info btn-sm col-sm-10 col-md-10 col-lg-5 mt-1">
                    view product
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm col-sm-10 col-md-10 col-lg-5 mt-1"
                    onClick={() =>
                      dispatch(
                        addItem({
                          user_email: user ? user.email : "",
                          product_id: productProps.id,
                        })
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
            <div className="card">
              <div className="d-flex justify-content-between p-3">
                <p className="lead mb-0" style={{ fontSize: "15px" }}></p>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center shadow-1-strong p-0 mb-0"
                  style={{
                    width: "35px",
                    height: "35px",
                    backgroundColor: "#efefef",
                  }}
                >
                  <i className="fs-5 fas fa-heart text-secondary"></i>
                </div>
              </div>
              <img src={logo} className="card-img-top" alt="Laptop" />
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="small">
                    <a className="text-muted"></a>
                  </p>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="mb-0 bg-secondary"></h5>
                  <p className="text-dark mb-0 fw-bolder"></p>
                </div>
                <div className="acard-footer row d-flex justify-content-around bg-dangera">
                  <button className="btn btn-outline-info btn-sm col-sm-10 col-md-10 col-lg-5 mt-1">
                    view product
                  </button>
                  <button className="btn btn-outline-primary btn-sm col-sm-10 col-md-10 col-lg-5 mt-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-2">
          <div className="card">
            <div className="d-flex justify-content-between p-3">
              <p className="lead mb-0" style={{ fontSize: "15px" }}></p>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center shadow-1-strong p-0 mb-0"
                style={{
                  width: "35px",
                  height: "35px",
                  backgroundColor: "#efefef",
                }}
              >
                <i className="fs-5 fas fa-heart text-secondary"></i>
              </div>
            </div>
            <img src={logo} className="card-img-top" alt="Laptop" />
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <p className="small">
                  <a className="text-muted"></a>
                </p>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0 bg-secondary"></h5>
                <p className="text-dark mb-0 fw-bolder"></p>
              </div>
              <div className="acard-footer row d-flex justify-content-around bg-dangera">
                <button className="btn btn-outline-info btn-sm col-sm-10 col-md-10 col-lg-5 mt-1">
                  view product
                </button>
                <button className="btn btn-outline-primary btn-sm col-sm-10 col-md-10 col-lg-5 mt-1">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowProduct;
