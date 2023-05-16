import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../../features/post/postProductSlice.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useEffect } from "react";
import logo from "../../logo.png";
import axios from "axios";
import Swal from "sweetalert2";

export const AddProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [allCategories, setAllCategories] = useState([{ name: "" }]);
  const [user, loading] = useAuthState(auth);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
      setIsFormValid(true);
      const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : "";
      Swal.fire({
        title: "Are you sure to add this product?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Add",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(
            postProduct({
              name,
              category,
              stock,
              description,
              price,
              image: imageUrl,
            })
          );
          setName("");
          setCategory("");
          setDescription("");
          setSelectedImage(null);
          setPrice(0);
        } else if (result.isDenied) {
          Swal.fire("The product has not been added", "", "info");
        }
      });
    } else {
      setIsFormValid(false);
    }
  };

  const cancel = () => {
    window.location.reload();
  };

  return (
    <>
      <h3>Create a new product</h3>
      <form
        onSubmit={handleSubmit}
        className="row row-cols-1 row-cols-1 row-cols-lg-2 g-4 bg-light rounded pt-3"
      >
        <div className="p-3">
          <div className="mb-3">
            <label className="form-label">Product name</label>
            <input
              required
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">choose Category</label>
            <div className="d-flex ">
              <input
                required
                type="text"
                className="form-control"
                name="category"
                list="categories"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <datalist id="categories">
                {allCategories.map((cat, i) => {
                  return (
                    <option
                      className="bg-light"
                      key={i}
                      value={cat.name}
                    ></option>
                  );
                })}
              </datalist>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              required
              type="number"
              className="form-control"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product description</label>
            <input
              required
              type="text"
              name="example"
              className="form-control"
              value={description}
              maxLength="30"
              placeholder="Max 30 characters allowed *"
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Price</label>
            <input
              required
              type="number"
              className="form-control"
              name="Price"
              min={0}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              required
              type="file"
              className="form-control"
              name="myImage"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
          </div>
        </div>

        <div className="col">
          <div className="col text-center rounded">
            <div className="card">
              <div className="card-body">
                {selectedImage ? (
                  <div>
                    <img
                      alt="not found"
                      width={"250px"}
                      src={URL.createObjectURL(selectedImage)}
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      alt="not found"
                      width={"250px"}
                      src={logo}
                      className="shadow p-5 my-5"
                    />
                  </div>
                )}

                <h6 className="card-title">name : {name ? name : "X"}</h6>
                <div className="d-flex justify-content-between">
                  <p className="card-text">
                    Category : {category ? category : "X"}
                  </p>
                  <p className="card-text border p-1 mx-2 rounded">
                    Description : {description ? description : "xx"}
                  </p>
                  <p className="card-text text-danger align-items-center fs-6 fw-bold">
                    price : {price ? price : "00.00"} $
                  </p>
                </div>
              </div>
              <div className="card-footer">
                <div className="bottom-wrap d-flex justify-content-around">
                  {" "}
                  <button
                    type="submit"
                    href="#"
                    className="btn btn-primary float-right"
                    data-abc="true"
                  >
                    {" "}
                    Create Product{" "}
                  </button>
                  <div className="price-wrap">
                    {" "}
                    <button
                      className="btn btn-warning float-left"
                      onClick={() =>
                        window.confirm("Reset product Form") && cancel()
                      }
                    >
                      {" "}
                      reset{" "}
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
