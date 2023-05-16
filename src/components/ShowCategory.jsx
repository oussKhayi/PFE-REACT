import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProductsByCategory,
} from "../features/get/productSlice";
import { addItem } from "../features/cart/cartSlice";
import { favItem } from "../features/favorite/favSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ShowProduct from "./ShowProduct";

function ShowCategory(props) {
  const { name } = useParams();
  const [favState, setFavState] = useState(false);
  const dispatch = useDispatch();
  const myCat = useSelector((state) => selectProductsByCategory(state, name));
  const [user, loading] = useAuthState(auth);
  const id = !loading ? 1 : 1;
  const user_email = !loading && user ? user.email : "";
  // const getFavFunc = () => {
  //   const userObj = user
  //     ? user
  //     : { displayName: "unknown", email: "nobody@email.com" };

  //   dispatch(
  //     getFav({
  //       user_email: userObj.email,
  //     })
  //   );
  // };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container p-4">
      
      <h2 className="fw-bold text-center py-2 mb-3">
        This is the available {name}
      </h2>
      <div className="row">
        {myCat.map((product, index) => {
          return <ShowProduct product={product} key={index}/>;
        })}
      </div>
    </div>
  );
}

export default ShowCategory;
