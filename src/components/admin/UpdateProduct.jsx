import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../../features/post/postProductSlice.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useEffect } from "react";
import logo from "../../logo.png";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

export const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = JSON.parse(decodeURIComponent(id));
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  console.log("====================================");
  console.log(product);
  console.log("====================================");
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, loading] = useAuthState(auth);
  const API_URL = "http://localhost:3030";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
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
          axios
            .put(`${API_URL}/products/${product.id}`, {
              name,
              category,
              price,
              stock,
              image: imageUrl,
            })
            .then((res) => {
              Swal.fire(
                "Updated",
                `the product with id ${product.id} updated successfully`,
                "success"
              );
              navigate("/admin/stock");
            });
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
              className="form-control"
              value={description}
              maxLength="30"
              placeholder="Max 30 characters allowed *"
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
                      src={product.image}
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

export default UpdateProduct;
