import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// import { setCartData } from "./cartSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export default function LandingPage() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  //   const userEmail = useSelector((state) => state.user.email);
  //   const cartData = useSelector((state) => state.cart);

  useEffect(() => {
    // Send a GET request to check if the user's email address exists in the database
    if (loading === false) {
      axios
        .get(`http://localhost:3000/users?id=${user.email}`)
        .then((response) => {
          if (response.data.length > 0) {
            // If the email address exists, log the user in and retrieve their cart data
            // using another GET request
            // Set the cart data in the Redux store using Redux Toolkit
            axios
              .get(`http://localhost:3000/carts?user_id=${user.email}`)
              .then((response) => {
                console.table(response.data);
                //   dispatch(setCartData(response.data[0].items));
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            // If the email address does not exist, create a new user and cart using a POST request
            // Set the cart data in the Redux store using Redux Toolkit
            axios
              .post("http://localhost:3000/users", { email: user.email })
              .then((response) => {
                console.table(response.data);
                //   axios
                //     .post("http://localhost:3000/carts", { user_id: user.email })
                //     .then((response) => {
                //       dispatch(setCartData([]));
                //     })
                //     .catch((error) => {
                //       console.log(error);
                //     });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // Render your app here
  return(<>
  <h1>LandingPage</h1>
  <h1>{loading?"loading...":user.email}</h1>
  <div className="section">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
            {/* shop */}
            <div className="col-md-4 col-xs-6">
              <div className="shop">
                <div className="shop-img">
                  <img src="./img/shop01.png" alt="" />
                </div>
                <div className="shop-body">
                  <h3>Laptop<br />Collection</h3>
                  <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right" /></a>
                </div>
              </div>
            </div>
            {/* /shop */}
            {/* shop */}
            <div className="col-md-4 col-xs-6">
              <div className="shop">
                <div className="shop-img">
                  <img src="./img/shop03.png" alt="" />
                </div>
                <div className="shop-body">
                  <h3>Accessories<br />Collection</h3>
                  <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right" /></a>
                </div>
              </div>
            </div>
            {/* /shop */}
            {/* shop */}
            <div className="col-md-4 col-xs-6">
              <div className="shop">
                <div className="shop-img">
                  <img src="./img/shop02.png" alt="" />
                </div>
                <div className="shop-body">
                  <h3>Cameras<br />Collection</h3>
                  <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right" /></a>
                </div>
              </div>
            </div>
            {/* /shop */}
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
  </>)
}
