import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  testCheck,
  insertOne,
  insertOneCart,
  uploadCart,
} from "../features/get/testSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);
  const userObj = user ? user : null;
  const API_URL = "http://localhost:3030";
  const localUser = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (loading === false) {
          const userEmail = user ? user.email : null;
          user &&
            toast.info(`welcome mr ${user.displayName}`, {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })  

          // Fetch user data using axios and the user's email

          try {
            const cartDB = await axios
              .get(`${API_URL}/cart?user_id=${userEmail}`)
              .then((res) => {
                return res.data;
              });

            // Set the user data in the component state
            if (cartDB.length < 1) {
              localStorage.getItem("cart")
                ? dispatch(
                    uploadCart({
                      email: userObj.email,
                      localCart: JSON.parse(localStorage.getItem("cart")),
                    })
                  )
                : dispatch(
                    insertOneCart({
                      email: userObj.email,
                      username: userObj.displayName,
                    })
                  );

              toast.success(`cart data inserted successfully !`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
              localStorage.setItem("cart", JSON.stringify(cartDB[0]));
              // window.location.reload();
            }
          } catch (error) {}
          try {
            const userDB = await axios
              .get(`${API_URL}/users/${userEmail}`)
              .then((res) => {
                return res.data;
              });
          } catch (error) {
            if (error.response.status === 404) {
              dispatch(
                insertOne({
                  email: userObj.email,
                  username: userObj.displayName,
                })
              );

              toast.success(`user inserted successfully !`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
            }
            // toast.error(`${error.message}`, {
            //   position: "top-center",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "light",
            // });
          }
        }
      } catch (error) {}
    };

    fetchUserData();
  }, [user]);

  return (
    <div>
      <h1>Home</h1>
      {loading ? (
        <h1>loading...</h1>
      ) : user ? (
        <h1>welcome to our E-store mr {user.displayName}</h1>
      ) : (
        // <button
        //   className="btn btn-warning"
        //   onClick={() =>
        //     dispatch(
        //       testCheck({
        //         email: userObj.email,
        //         displayName: userObj.displayName,
        //       })
        //     )
        //   }
        // >
        //   test
        // </button>
        <>no btn</>
      )}
      {/* {user ? <h1>{user.email}</h1> : ""} */}
      <div className="d-grid gap-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            dispatch(
              insertOne({
                email: userObj.email,
                displayName: userObj.displayName,
              })
            )
          }
        >
          insert user
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            dispatch(
              insertOneCart({
                email: userObj.email,
                displayName: userObj.displayName,
              })
            )
          }
        >
          insert user cart
        </button>
      </div>
    </div>
  );
};

export default Home;
