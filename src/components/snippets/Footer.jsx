import React from "react";

const Footer = () => {
  return (
    <div id="contact">
      <footer className="text-center text-lg-start bg-light text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="" className="me-4 text-reset">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="" className="me-4 text-reset">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Laptops
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Tv
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Accessories
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Phones
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                {/* <p><i className="fa fa-home me-3"></i> New York, NY 10012, US</p> */}
                <p>
                  {/* <i className="fa fa-envelope me-3"></i> */}
                  khayi.ouss@gmail.com
                </p>
                <p>
                  <i className="fa fa-phone me-3"></i> + 2126 58 26 28 86
                </p>
                <p>
                  <i className="fa fa-print me-3"></i> + 2126 26 25 79 44
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-4">
          © 2023 Copyright:
          <a className="text-reset fw-bold" href="#">
             DEV Option FUll Stack 203
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
