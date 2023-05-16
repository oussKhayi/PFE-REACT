import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  deleteProduct,
  fetchProducts,
} from "../../features/post/postProductSlice";
import Swal from "sweetalert2";
import Loading from "../snippets/Loading";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const fetchAllProducts = useSelector((state) => state.postProduct);
  const reEffect = fetchAllProducts.products.length > 0 ? false : true;
  useEffect(() => {
    dispatch(fetchProducts());
    setAllProducts(fetchAllProducts.products);
  }, [reEffect]);

  function deleteP(id) {
    Swal.fire({
      title: "Do you want to delete this product?",
      showDenyButton: true,

      confirmButtonText: "Delete It",
      denyButtonText: `Keep It`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct({ product_id: id }));
        window.location.reload()
      } else if (result.isDenied) {
        Swal.fire("The product has not deleted", "", "info");
      }
    });
    
  }

  return (
    <>
      <div className="col-12 d-flex justify-content-between align-bottom">
        <h3>Manage products</h3>
        <div className="col-5">
          <input
            type="text"
            placeholder="Search fo Product"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {!fetchAllProducts.isLoading ? (
        <table className="table mt-2">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              {/* <th scope="col">Category</th> */}
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts
              .filter((p) =>
                p.name.toUpperCase().includes(search.toUpperCase())
              )
              .map((p, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{p.id}</th>
                    <td>{p.name}</td>
                    {/* <td>{p.category}</td> */}
                    <td>{parseInt(p.price).toFixed(2)} $</td>
                    <td>{parseInt(p.stock)}</td>
                    <td className="row col-12">
                      <a
                        href={`/product/${p.id}`}
                        className="btn btn-sm btn-info col-3 col-md-3 text-light p-0 my-1"
                      >
                        <i className="fa-solid fa-eye" />
                      </a>
                      <Link
                      className="btn btn-sm btn-warning col-3 col-md-3 text-light p-0 my-1"
                        to={`/admin/update/${encodeURIComponent(
                          JSON.stringify(p)
                        )}`}
                      >
                        <i className="fa-solid fa-pencil" />
                        {/* <a href={`/admin/update?prodeuct=${1}`} className="btn btn-sm btn-warning col-3 mx-1 col-md-3 text-light p-0 my-1"> */}
                        {/* </a> */}
                      </Link>
                      <button
                        className="btn btn-sm btn-danger col-3 col-md-3 text-light p-0 my-1"
                        onClick={() => deleteP(p.id)}
                      >
                        <i className="fa-solid fa-trash" />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ManageProducts;
