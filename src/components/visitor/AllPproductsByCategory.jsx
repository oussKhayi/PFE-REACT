import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsByCategory,
} from "../../features/get/productSlice";

function AllPrByCt() {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const tvProducts = useSelector((state) =>
    selectProductsByCategory(state, "tv")
  ); 
  const phoneProducts = useSelector((state) =>
    selectProductsByCategory(state, "phones")
  );
  const laptopProducts = useSelector((state) =>
    selectProductsByCategory(state, "laptops")
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {allProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <h2>TV Products</h2>
      <ul>
        {tvProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <h2>Phone Products</h2>
      <ul>
        {phoneProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <h2>Laptop Products</h2>
      <ul>
        {laptopProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AllPrByCt;
