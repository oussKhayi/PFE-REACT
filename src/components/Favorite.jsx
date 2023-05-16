import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorite, fetchProducts } from "../features/favorite/favSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import axios from "axios";
import ShowProduct from "./ShowProduct";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3030";

const Favorite = () => {
  const dispatch = useDispatch();
  // const [likedProducts, setLikedProducts] = useState([]);
  // const favData = useSelector((state) => state.favorite);
  const [user, loading] = useAuthState(auth);
  const [products, setProducts] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      toast.info("Please log in to access your favorite product.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/auth/login");
    }
    const fetchAll = async () => {
      await axios
        .get(`${API_URL}/favorite?user_id=${user.email}`)
        .then((res) => {
          // if (res.data.length < 1) {
          //   axios
          //     .post(`${API_URL}/favorite`, {
          //       user_id: user.email,
          //       items: [],
          //     })
          //     .then((res) => {
          //       console.log("new fav inserted");
          //     });
          // }
          if (res.data[0]) {
            setFavorite(res.data[0].items);
          }
          return res.data;
        });

      await axios.get(`${API_URL}/products`).then((res) => {
        // localStorage.setItem("allProducts", JSON.stringify(res.data));
        setProducts(res.data);
        return res.data;
      });
    };
    !loading && fetchAll();
  }, [loading]);

  return (
    <>
      <>
        <div className="container">
          <h1>Favorite</h1>
        </div>
      </>
      <div>
        {!loading ? (
          <div className="row p-2">
            {favorite.map((id, index) => {
              return <ShowProduct id={id} key={index} />;
            })}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default Favorite;
