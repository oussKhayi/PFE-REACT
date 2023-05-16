import { Error } from "./components/Error";
import Nav from "./components/snippets/Nav";
import Footer from "./components/snippets/Footer";
import AddProduct from "./components/admin/AddProduct";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AllPrByCt from "./components/visitor/AllPproductsByCategory";
import Home from "./components/Home";

import RegisterPage from "./components/visitor/RegisterPage";
import LoginPage from "./components/visitor/LoginPage";
import { Cart } from "./components/cart";
import { useEffect, useState } from "react";
import { auth } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { checkUser } from "./features/post/postUserSlice";
import LandingPage from "./components/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IpAddress from "./components/IpAddress";
import Favorite from "./components/Favorite";
import { emptyCart } from "./features/cart/cartSlice";
import axios from "axios";
import ShowProduct from "./components/ShowProduct";
import ShowCategory from "./components/ShowCategory";
import { useDispatch } from "react-redux";
import Test from "./components/Test";
import logo from "./logo.png";
import "./styling/style.css";
import "./styling/slick.css";
import Loading from "./components/snippets/Loading";
import Dashboard from "./components/admin/Dashboard";
import Admin from "./components/admin/Admin";
import ManageProducts from "./components/admin/ManageProducts";
import Orders from "./components/admin/Orders";
import UpdateProduct from "./components/admin/UpdateProduct";

function App() {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);
  const [dbUser, setDbUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (!loading && !user) {
        localStorage.removeItem("cart");
        dispatch(emptyCart({ user_email: "user_email" }));
      }
      user &&
        (await axios
          .get(`http://localhost:3030/users/${user.email}`)
          .then((res) => {
            setDbUser(res.data);
          }));
    };
    fetchUser();
  }, [user]);

  return (
    <div className="container shadow" style={{ paddingTop: "60px" }}>
      <BrowserRouter>
        <Nav />
        {!loading ? (
          <Routes>
            <Route path="/" index element={<Test />} />
            {/* <Route index path="/" element={<Home />} /> */}
            {!loading && user && dbUser.role === ("admin" || "owner") && (
              <>
                <Route path="/admin" element={<Admin />}>
                  <Route path="dash" element={<Dashboard />} />
                  <Route path="add-products" element={<AddProduct />} />
                  <Route path="chart" element={<h1>chart</h1>} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="stock" element={<ManageProducts />} />
                  <Route path="update/:id" element={<UpdateProduct />} />
                </Route>
              </>
            )}
            <Route path="/cart" element={<Cart />} />
            <Route path="/cat" element={<AllPrByCt />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/ip" element={<IpAddress />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="product/:id" element={<ShowProduct />} />
            <Route path="category/:name" element={<ShowCategory />} />
            {/* <Route path="manage" element={<ManageProducts />} /> */}
            <Route path="*" element={<Error />} />
          </Routes>
        ) : (
          <Loading />
        )}
        <Footer />
        <ToastContainer />
      </BrowserRouter>
      {/* <Pagination/> */}
    </div>
  );
}
export default App;
