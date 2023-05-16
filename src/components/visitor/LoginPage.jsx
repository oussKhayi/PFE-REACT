import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const API_URL = "http://localhost:3030";
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {}
  };
  if (user) {
    axios.get(`${API_URL}/users/${user.email}`).then((res) => {
      if (res.data) {
        axios.put(`${API_URL}/users/${user.email}`, {
          email: user.email,
          role: res.data.role,
          status: "online",
        });
        navigate('/')
      }
    });

    // navigate("/") && window.location.reload();
  }
  return (
    <>
      {!user && (
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>
                  <div className="form-outline mb-4 text-start">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-outline mb-4 text-start">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>
                  <hr className="my-4" />
                  <div className="d-flex justify-content-center py-0">
                    <button
                      className="btn btn-lg btn-block btn-primary"
                      style={{ backgroundColor: "#dd4b39" }}
                      type="submit"
                      onClick={googleLogin}
                    >
                      Sign in with google
                      <i className=" ms-3 fab fa-google me-2" />
                    </button>
                    {/* <button
                      className="btn btn-lg btn-block btn-primary mb-2"
                      style={{ backgroundColor: "#3b5998" }}
                      type="submit"
                    >
                      Sign in with 
                      <i className=" ms-3 fab fa-facebook-f me-2" />
                    </button> */}
                  </div>
                  <p className="text-muted">
                    Or <a href="/auth/register">create a new account</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        // <section className="vh-9" style={{ backgroundColor: "whitesmoke" }}>
        //   <img src="" alt="" />
        //   <div className="container py-5 h-90">
        //     <div className="row d-flex justify-content-center align-items-center h-100">
        //       <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        //         <div
        //           className="card shadow-2-strong"
        //           style={{ borderRadius: "1rem" }}
        //         >
        //           <div className="card-body p-5 text-center">
        //             <h3 className="mb-5">Sign in or Sign Up</h3>
        //             <button
        //               className="btn btn-lg btn-block btn-primary mb-2"
        //               style={{ backgroundColor: "#dd4b39" }}
        //               type="submit"
        //               onClick={googleLogin}
        //             >
        //               <i className="fab fa-google me-2" /> Sign in with google
        //             </button>
        //             <button
        //               className="btn btn-lg btn-block btn-primary mb-2"
        //               style={{ backgroundColor: "#3b5998" }}
        //               type="submit"
        //             >
        //               <i className="fab fa-facebook-f me-2" />
        //               Sign in with facebook
        //             </button>
        //             <div className="form-outline mb-4">
        //           <input type="email" id="typeEmailX-2" className="form-control form-control-lg" />
        //           <label className="form-label" >Email</label>
        //         </div>
        //         <div className="form-outline mb-4">
        //           <input type="password" id="typePasswordX-2" className="form-control form-control-lg" />
        //           <label className="form-label" >Password</label>
        //         </div>
        //             Checkbox
        //             <div className="form-check d-flex justify-content-start mb-4">
        //           <input className="form-check-input" type="checkbox" defaultValue id="form1Example3" />
        //           <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
        //         </div>
        //             <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
        //         <hr className="my-4" />
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </section>
      )}
      {user && (
        <>
          <h2>hello mr {user.displayName}</h2>
        </>
      )}
    </>
  );
};

export default LoginPage;
