import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/get/productSlice";
import { emptyCart, removeItemFormCart } from "../features/cart/cartSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import Swal from "sweetalert2";
import logo from "../logo.png";
import axios from "axios";
import Loading from "./snippets/Loading";

export function Cart() {
  const cart = useSelector((state) => state.cart);
  const data = useSelector((state) => state.product);
  const URL_API = "http://localhost:3030";
  const [cartItems, setCartItems] = useState([]);

  function handelChange(e) {
    const id = e.target.id;
    const value = e.target.value;
    cartItems.map((p) => {
      if (parseInt(p.product_id) === parseInt(id)) {
        p.quantity = parseInt(value);
      }
      return p;
    });
  }
  function incr(id) {
    const newCart = cartItems.map((p) => {
      if (parseInt(p.product_id) === parseInt(id)) {
        const newP = { ...p, quantity: p.quantity + 1 };
        return newP;
      } else {
        return p;
      }
    });
    setCartItems(newCart)
  }
  function decr(id) {
    const newCart = cartItems.map((p) => {
      if (parseInt(p.product_id) === parseInt(id)) {
        const newP = { ...p, quantity: p.quantity - 1 };
        return newP;
      } else {
        return p;
      }
    });
    setCartItems(newCart)
  }

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = '';

  //     // Customize the confirmation message
  //     const confirmationMessage = 'Are you sure you want to leave this page? Your changes may not be saved.';

  //     return confirmationMessage;
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);
  // const totalPrice = cart
  //   ? cart.items.reduce((total, product) => total + parseFloat(product.price), 0)
  //   : 0;

  const isLoading = data.isLoading;
  const products = data.products;
  const isRejected = data.isRejected;
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);

  function empty() {
    Swal.fire({
      title: "Are you sure?",
      text: "do you confirm to empty your cart ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Empty it!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("cart");
        if (user) {
          dispatch(emptyCart({ user_email: user.email }));
        }

        Swal.fire("Emptied!", "Your cart has been emptied.", "success");
      }
    });
  }

  function applyOrder() {
    if (!loading && user) {

// axios.put(`${URL_API}/cart/${}`)

      const date = new Date();
      const formattedDate = date.toDateString();
      const order = {
        user_id: user.email,
        order_date: formattedDate,
        items: [...cart.items],
      };
      console.log("====================================");
      console.log(order);
      console.log("====================================");
      axios
        .post(`${URL_API}/orders`, order)
        .then((res) => {
          Swal.fire(
            "Done !",
            "Thank you for your order! We're processing it right away.",
            "success"
          );
        })
        .catch((error) => {
          console.log(error.state);
        });
    }
  }
  useEffect(() => {
    dispatch(fetchProducts());
    setCartItems(cart.items);
    console.log(cart.items);
  }, [cart]);

  const totalPrice = cart
    ? cart.items.reduce((total, item) => {
        const product = products.find((p) => p.id === item.product_id);
        if (product) {
          return parseFloat(
            total + parseFloat(product.price).toFixed(2)
          ).toFixed(2);
        }
        return total;
      }, 0.0)
    : 0;

  return (
    <>
      {/* <button className="btn btn-danger" onClick={()=>dispatch(emptyCart())}>emptyCart</button> */}
      {!isRejected && products !== [] ? (
        isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <section className="h-100 gradient-custom">
              <div id="newsletter" className="section py-2 shadow-sm">
                {/* container */}
                <div className="container">
                  {/* row */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="newsletter">
                        <p>
                          Your Cart : <strong>Finalize Your Order</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* /row */}
                </div>
                {/* /container */}
              </div>
              <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                  <div className="col-md-8">
                    <div className="card mb-4">
                      <div className="card-header py-3">
                        <h5 className="mb-0">
                          Cart - {cart.items.length} items
                        </h5>
                      </div>
                      <div className="card-body">
                        {/* Single item */}

                        {cartItems ? (
                          cartItems.map((item, index) => {
                            const product = products.find(
                              (p) => p.id === item.product_id
                            );

                            if (!product) {
                              return (
                                <div
                                  className="col-sm-6 col-md-4 col-lg-3 mb-2"
                                  key={index}
                                >
                                  <div className="card">
                                    <div className="d-flex justify-content-between p-3">
                                      <p
                                        className="lead mb-0"
                                        style={{ fontSize: "15px" }}
                                      ></p>
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
                                    <img
                                      src={logo}
                                      className="card-img-top"
                                      alt="Laptop"
                                    />
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
                              );
                            }
                            return (
                              <div key={index}>
                                <div className="row">
                                  <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                    {/* Image */}
                                    <div
                                      className="bg-image hover-overlay hover-zoom ripple rounded"
                                      data-mdb-ripple-color="light"
                                    >
                                      <img
                                        src={product.image}
                                        // src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp"
                                        loading="lazy"
                                        className="w-100"
                                        alt={product.name}
                                      />
                                      <a href="#!">
                                        <div
                                          className="mask"
                                          style={{
                                            backgroundColor:
                                              "rgba(251, 251, 251, 0.2)",
                                          }}
                                        />
                                      </a>
                                    </div>
                                    {/* Image */}
                                  </div>
                                  <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                    {/* Data */}
                                    <p>
                                      <strong>
                                        {product.name.toUpperCase()}
                                      </strong>
                                    </p>
                                    <p>Stock: Available</p>
                                    <p>
                                      Category :{" "}
                                      <a href={`/category/${product.category}`}>
                                        {product.category}
                                      </a>
                                    </p>
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-sm me-1 mb-2"
                                      data-mdb-toggle="tooltip"
                                      title="Remove item"
                                    >
                                      <i className="fas fa-trash" />
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm mb-2"
                                      data-mdb-toggle="tooltip"
                                      title="Move to the wish list"
                                    >
                                      <i className="fas fa-heart" />
                                    </button>
                                    {/* Data */}
                                  </div>
                                  <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                    {/* Quantity */}
                                    <div
                                      className="d-flex mb-4"
                                      style={{ maxWidth: "300px" }}
                                    >
                                      <button
                                        className="btn btn-primary px-3 me-2"
                                        onClick={() => decr(item.product_id)}
                                      >
                                        <i className="fas fa-minus" />
                                      </button>
                                      <div className="form-outline">
                                        <input
                                          min={1}
                                          name="quantity"
                                          type="number"
                                          id={item.product_id}
                                          value={item.quantity}
                                          onChange={(e) => handelChange(e)}
                                          className="form-control"
                                        />
                                        <label
                                          className="form-label"
                                          htmlFor="form1"
                                        >
                                          Quantity
                                        </label>
                                      </div>
                                      <button
                                        className="btn btn-primary px-3 ms-2"
                                        onClick={() => incr(item.product_id)}
                                      >
                                        <i className="fas fa-plus" />
                                      </button>
                                    </div>
                                    {/* Quantity */}
                                    {/* Price */}
                                    <p className="text-start text-md-center">
                                      <strong>
                                        ${parseFloat(product.price).toFixed(2)}
                                      </strong>
                                    </p>
                                    {/* Price */}
                                  </div>
                                </div>
                                <hr className="my-4" />
                              </div>
                            );
                          })
                        ) : (
                          <Loading />
                        )}

                        {/* Single item */}
                      </div>
                    </div>
                    <div className="card mb-4">
                      <div className="card-body">
                        <p>
                          <strong>Expected shipping delivery</strong>
                        </p>
                        <p className="mb-0">12.10.2020 - 14.10.2020</p>
                      </div>
                    </div>
                    <div className="card mb-4 mb-lg-0">
                      <div className="card-body">
                        <p>
                          <strong>We accept</strong>
                        </p>
                        <img
                          className="me-2"
                          width="45px"
                          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                          alt="Visa"
                        />
                        <img
                          className="me-2"
                          width="45px"
                          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                          alt="American Express"
                        />
                        <img
                          className="me-2"
                          width="45px"
                          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                          alt="Mastercard"
                        />
                        <img
                          className="me-2"
                          width="45px"
                          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
                          alt="PayPal acceptance mark"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card mb-4">
                      <div className="card-header py-3">
                        <h5 className="mb-0">Summary</h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Products
                            <span>${totalPrice}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                            Shipping
                            <span>Gratis</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                            <div>
                              <strong>Total amount</strong>
                              <strong>
                                <p className="mb-0">(including VAT)</p>
                              </strong>
                            </div>
                            <span>
                              <strong>$53.98</strong>
                            </span>
                          </li>
                        </ul>
                        <div className="row d-flex justify-content-around">
                          <button
                            type="button"
                            className="btn btn-primary col-5 col-sm-12 mt-1"
                            onClick={() => applyOrder()}
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-block col-5 col-sm-12 mt-1"
                            onClick={() => empty()}
                          >
                            Empty cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {cart.items.map((item, index) => {
              const product = products.find((p) => p.id === item.product_id);

              if (!product) {
                return <div key={index} className="bg-danger p-5"></div>;
              }
              // return (
              //   <div key={index} className="card border p-2 m-2">
              //     <div className="card-body">
              //       <h4 className="card-title">{product.id}</h4>
              //       <p className="card-text">{product.name}</p>
              //       <p className="card-text">{product.name}</p>
              //     </div>
              //   </div>
              // );
            })}
          </>
        )
      ) : (
        <>
          <h1>something went wrong!</h1>
        </>
      )}
    </>
  );
}
