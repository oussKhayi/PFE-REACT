import axios from "axios";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [allCategories, setAllCategories] = useState([{ name: "" }]);
  useEffect(() => {
    const fetchAllCategories = async () => {
      setAllCategories(
        await axios.get("http://localhost:3030/categories").then((res) => {
          return res.data;
        })
      );
    };
    fetchAllCategories();
  }, []);

  return (
    <div className="section">
      <div className="container">
      <div id="newsletter" className="section py-2 shadow-sm">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-md-12">
              <div className="newsletter">
                <p>Welcome Again : <strong>Brows our new products</strong></p>
                
              </div>
            </div>
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
        <div className="row p-4 mt-3 d-flex justify-content-around">
          {allCategories.map((cat, ind) => {
            return (
              <div key={ind} className="col-md-3 col-xs-6 col-10 shadow-sm">
                <div className="shop">
                  <div className="shop-img">
                    <img src={cat.logo ?cat.logo:""} alt="" />
                  </div>
                  <div className="shop-body">
                    <h3>
                      {cat.name}
                      <br />
                      Collection
                    </h3>
                    <a href={`category/${cat.name}`} className="cta-btn">
                      Shop now <i className="fa fa-arrow-circle-right" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Test;
