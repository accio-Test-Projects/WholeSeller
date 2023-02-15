import React from "react";
import AllproductsView from "./AllproductsView";
import AddProduct from "./AddProduct";
import { Grid, Button } from "@mui/material";
import "./allproduct.css";
function AllProducts() {
  const [addProduct, setAddProduct] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  return (
    <div>
      <div className="btn-container">
        {addProduct ? (
          <Button onClick={() => setAddProduct(false)}>Back</Button>
        ) : (
          <Button
            onClick={() => {
              setAddProduct(true);
              selectedProduct(null);
            }}
          >
            Add Product
          </Button>
        )}
      </div>

      {addProduct ? (
        <AddProduct
          selectedProduct={selectedProduct}
          setAddProduct={setAddProduct}
        />
      ) : (
        <AllproductsView
          setSelectedProduct={setSelectedProduct}
          setAddProduct={setAddProduct}
        />
      )}
    </div>
  );
}

export default AllProducts;
