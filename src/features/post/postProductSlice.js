import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const url = "http://localhost:3030/products";
const initialState = {
  isLoading: false,
  isRejected: false,
  products: [],
  error: null,
};

export const fetchProducts = createAsyncThunk("get/fetchProducts", async () => {
  const response = await axios.get(url).then((res) => {
    return res;
  });
  return response.data;
});

export const postProductSlice = createSlice({
  name: "postProduct",
  initialState,
  reducers: {
    postProduct: (state, res) => {
      res.payload.name &&
        axios
          .post(url, res.payload)
          .then((response) => {
            Swal.fire("product created successfully!", "", "success");
            const newCat = async () => {
              await axios
                .get("http://localhost:3030/categories")
                .then((resp) => {
                  const isCategoryNotExist = resp.data.every(
                    (item) => item.name !== res.payload.category
                  );
                  if (isCategoryNotExist) {
                    axios
                      .post("http://localhost:3030/categories", {
                        name: res.payload.category,
                      })
                      .then(
                        toast.info(
                          `${res.payload.category} category inserted !`,
                          {
                            position: "bottom-center",
                            autoClose: false,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          }
                        )
                      );
                  }
                });
            };
            newCat();
          })
          .catch((error) => {
            console.log(error.message);
            toast.error(error.message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
    },
    deleteProduct: (state, action) => {
      const { product_id } = action.payload;
      try {
        axios.delete(`${url}/${product_id}`);
        const filteredProducts = state.products.filter(
          (p) => parseInt(p.id) !== parseInt(product_id)
        );
        localStorage.setItem("allProducts", JSON.stringify(filteredProducts));
        state.products = filteredProducts;
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: `Error ${error.status}`,
          text: `${error.reason}`,
        });
      }
    },

    // deleteProduct: (state, action) => {
    //   const { product_id } = action.payload;
    //   try {
    //     axios.delete(`${url}/${product_id}`).then((res) => {
    //       state.products = state.products.filter((p) => {
    //         localStorage.setItem("allProducts", JSON.stringify(state.products));
    //         window.location.reload()
    //         Swal.fire("Deleted!", "Your file has been deleted.", "success");
    //         return parseInt(p.id) !== parseInt(state.products);
    //       });
    //     });
    //   } catch (error) {
    //     Swal.fire({
    //       icon: "error",
    //       title: `Error ${error.status}`,
    //       text: `${error.reason}`,
    //     });
    //   }
    // },
    updateProduct: (state, action) => {
      const { product_id, updatedProduct } = action.payload;

      axios.put(`${url}/${product_id}`, updatedProduct).then((response) => {
        Swal.fire("Updated!", "Your product has been updated.", "success");
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRejected = false;

        state.products = action.payload;
        localStorage.setItem("allProducts", JSON.stringify(state.products));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRejected = true;
        state.error = action.error.message;
        console.log("failed", action.error.message);
      });
  },
});

export const { postProduct, deleteProduct, updateProduct } =
  postProductSlice.actions;

export default postProductSlice.reducer;
