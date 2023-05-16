import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useNavigate, Link } from "react-router-dom";
import { emptyCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../../logo.png";
const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState("");

  const cart = useSelector((state) => state.cart);
  const [user, loading] = useAuthState(auth);
  const [favorite, setFavorite] = useState([]);
  const API_URL = "http://localhost:3030";
  const user_email = user ? user.email : "";
  const [dbUser, setDbUser] = useState({});
  const cartCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
          })) &&
        setCurrUser(user.email);
    };
    fetchUser();
  }, [user]);

  function logOut() {
    dispatch(emptyCart({ user_email: user.email }));
    localStorage.removeItem("user");
    toast.info("Signed out successfully !", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    axios.get(`${API_URL}/users/${user.email}`).then((res) => {
      console.log(res.data);
      if (res.data) {
        axios.put(`${API_URL}/users/${user.email}`, {
          email: user.email,
          role: res.data.role,
          status: "offline",
        });
      }
    });
    auth.signOut();
    localStorage.removeItem("cart");
    navigate("/");
    window.location.reload()
  }

  const [allCategories, setAllCategories] = useState([{ name: "" }]);
  useEffect(() => {
    const fetchFAv = async () => {
      user &&
        (await axios
          .get(`${API_URL}/favorite?user_id=${user.email}`)
          .then((res) => {
            if (res.data[0]) {
              setFavorite(res.data[0].items);
            }
            return res.data;
          }));
    };
    const fetchAllCategories = async () => {
      setAllCategories(
        await axios.get(`${API_URL}/categories`).then((res) => {
          return res.data;
        })
      );
    };
    !loading && fetchFAv();
    fetchAllCategories();
  }, [loading]);
  return (
    <>
      <div
        className=" container shadow-sm fixed-top "
        style={{ backgroundColor: "#fcfcfce7" }}
      >
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="text-center col-2">
              <a className="navbar-brand name" href="/">
                {/* E-commerce */}
                <img
                  src={logo}
                  className="img-fluid rounded-top p-0"
                  width={100}
                />
              </a>
            </div>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" aria-current="page" href="/">
                    Home
                  </a>{" "}
                </li>
                {!loading && user && dbUser.role === "admin" && (
                  <li className="nav-item">
                    <Link to="admin/dash" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                )}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {/* <li>
                      <a className="dropdown-item" href={`/category/all`}>
                        ALL
                      </a>
                    </li> */}
                    {allCategories
                      .slice(0)
                      .reverse()
                      .map((cat, ind) => {
                        return (
                          <li key={ind}>
                            <Link
                              to={`category/${cat.name}`}
                              className="dropdown-item"
                            >
                              {cat.name.toUpperCase()}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="#">
                    Contact
                  </a>{" "}
                </li>
              </ul>
              <form className="d-flex searchitem">
                {" "}
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
            <div className="d-flex p-0 text-center align-items-center">
              <a
                href="/favorite"
                style={{ color: "#646973" }}
                className="p-0 badge  position-relative me-3"
              >
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {favorite ? favorite.length : 0}
                </span>
                <i className="fs-5 fas fa-heart"></i> <br />
                {/* <span style={{fontSize:"10px", fontWeight:"bolder"}}>Favorite</span> */}
              </a>
              <a
                href="/cart"
                style={{ color: "#646973" }}
                className="p-0 badge  position-relative me-3"
              >
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.items ? cartCount : 0}
                </span>
                <i className="fs-5 fa fa-shopping-cart"></i>
              </a>
              {!user && !loading && (
                <div className="nav-item m-0 p-0 dropdown">
                  <a
                    className="nav-link dropdown-toggle me-2 m-0 px-0"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "#646973" }}
                  >
                    <i className="fa-solid fa-user fs-5" />
                  </a>
                  <ul
                    className="dropdown-menu p-0"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a
                        type="button"
                        href="/auth/login"
                        className="nav-link rounded"
                        style={{ color: "#646973" }}
                      >
                        <i className="fa-sharp fa-solid fa-door-open" /> sing in
                      </a>
                    </li>
                    <li>
                      <a
                        type="button"
                        href="/auth/register"
                        className="nav-link rounded"
                        style={{ color: "#646973" }}
                      >
                        <i className="fa-solid fa-user-plus" /> sing up
                      </a>
                    </li>
                  </ul>
                </div>
              )}
              {loading ? (
                <>
                  <p
                    className="rounded-circle m-0"
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "#ffefff",
                    }}
                  ></p>
                </>
              ) : (
                user &&
                !loading && (
                  <>
                    <div className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle p-0"
                        style={{ width: "69px" }}
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src={user.photoURL}
                          width="34px"
                          className="rounded-circle m-0"
                          alt=""
                        />
                      </a>
                      <ul
                        className="dropdown-menu p-0"
                        aria-labelledby="navbarDropdown"
                      >
                        <a
                          className="btn m-0 p-1 ps-2 text-center align-items-center"
                          style={{
                            color: "#646973",
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          My orders
                        </a>{" "}
                        <p
                          className="btn m-0 p-1 ps-2 text-center align-items-center"
                          style={{
                            color: "#646973",
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          {user.email}
                        </p>{" "}
                        <br />
                        <button
                          className="btn p-1 ps-2 m-0 text-center align-items-center btn-sm "
                          style={{ color: "#646973" }}
                          onClick={() => logOut()}
                        >
                          Log out
                          <i className="ms-2 fs-5 fa-solid fa-right-from-bracket" />
                        </button>
                      </ul>
                    </div>
                    {/* <a href="/user" className="bg-warning rounded-circle" style={{width:'30px', height:'30px'}}>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      width="100%"
                      className="rounded-circle m-0"
                      alt=""
                    />
                  ) : (
                    user.displayName
                  )}
                </a> */}
                  </>
                )
              )}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                {" "}
                <span className="navbar-toggler-icon" />{" "}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
  // return (
  //   <nav
  //     className="navbar navbar-expand-lg navbar-light bg-light shadow rounded"
  //     id="nav"
  //   >
  //     <div className="container-fluid">
  //       <a href="/cart" className="p-0 badge text-dark position-relative me-3">
  //         <i className="fs-4 fa fa-light fa-cart-arrow-down"></i>
  //       </a>

  //       <a className="navbar-brand" href="/" style={{ fontWeight: "bolder" }}>
  //         <img
  //           src="./logo.png"
  //           className="img-fluid rounded-top p-0"
  //           width={100}
  //         />
  //       </a>
  //       <button
  //         className="navbar-toggler"
  //         type="button"
  //         data-bs-toggle="collapse"
  //         data-bs-target="#navbarSupportedContent"
  //         aria-controls="navbarSupportedContent"
  //         aria-expanded="false"
  //         aria-label="Toggle navigation"
  //       >
  //         <i className="fa fa-bars"></i>
  //       </button>
  //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  //           <li className="nav-item">
  //             <a
  //               className="nav-link active"
  //               aria-current="page"
  //               href="/"
  //             >
  //               About
  //             </a>
  //           </li>
  //           <li className="nav-item">
  //             <a
  //               className="nav-link active"
  //               aria-current="page"
  //               href="/insertProduct"
  //             >
  //               Add Product
  //             </a>
  //           </li>
  //           <li className="nav-item dropdown">
  //             <a
  //               className="nav-link dropdown-toggle"
  //               href="#"
  //               id="navbarDropdown"
  //               role="button"
  //               data-bs-toggle="dropdown"
  //               aria-expanded="false"
  //             >
  //               Categories
  //             </a>
  //             <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
  //               <li>
  //                 <a className="dropdown-item" href="/laptops">
  //                   Laptops
  //                 </a>
  //               </li>
  //               <li>
  //                 <a className="dropdown-item" href="/tv">
  //                   Tv
  //                 </a>
  //               </li>
  //               <li>
  //                 <a className="dropdown-item" href="/phones">
  //                   Phones
  //                 </a>
  //               </li>
  //               <li>
  //                 <a className="dropdown-item" href="/accessoires">
  //                   Accessoires
  //                 </a>
  //               </li>
  //             </ul>
  //           </li>
  //           <li className="nav-item">
  //             <a
  //               className="nav-link"
  //               href="#contact"
  //               tabIndex="-1"
  //               aria-disabled="true"
  //             >
  //               Contact Us
  //             </a>
  //           </li>
  //         </ul>
  //         <form className="d-flex">
  //           <input
  //             className="form-control me-2"
  //             type="search"
  //             placeholder="Search"
  //             aria-label="Search"
  //           />
  //           <button className="btn btn-outline-success" type="submit">
  //             Search
  //           </button>
  //         </form>
  // <a type="button" href="/createUser" className="nav-link m-1 rounded bg-success text-light">
  //   sing up
  // </a>
  //       </div>
  //     </div>
  //   </nav>
  // );
};

export default Nav;
