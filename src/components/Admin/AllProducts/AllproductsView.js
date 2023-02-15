import {
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../../fierbaseconfig";
import CommonTable from "../../common/CommonTable";
function AllproductsView({ setSelectedProduct, setAddProduct }) {
  const headCells = [
    {
      id: "product_name",

      label: "Product Name",
    },
    {
      id: "SKU",

      label: "SKU",
    },
    {
      id: "price",

      label: "Price",
    },
    {
      id: "stock",
      label: "Stock",
    },
    {
      id: "edit",
      label: "Edit",
      type: "button",
    },
    {
      id: "delete",
      label: "Delete",
      type: "button",
    },
  ];

  const [rows, setRow] = React.useState(null);
  const fetchData = async () => {
    // call firebase firstore to get all products from products collection
    try {
      // collection(db ref, collection name)

      const docref = collection(db, "products");
      //getDocs(doc ref);
      const docsSnap = await getDocs(docref);
      const products = [];
      docsSnap.forEach((doc) => {
        console.log(doc.id, doc.data());
        products.push(doc.data());
      });
      setRow(products);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handlebtn = (product, action) => {
    console.log(product, action);
    if (action === "delete") {
      const docRef = doc(db, "products", product.product_id);
      try {
        deleteDoc(docRef);

        setRow(rows.filter((row) => row.product_id !== product.product_id));
        alert("Product Deleted");
      } catch (err) {
        console.log(err);
      }
      // delete product from firebase products collection
    } else if (action === "edit") {
      setSelectedProduct(product);
      setAddProduct(true);
      // open edit product screen
      // pass product data to edit product screen
    }
  };

  return (
    <div>
      {rows && rows.length === 0 ? (
        <h1>No Products</h1>
      ) : rows && rows.length > 0 ? (
        <CommonTable handlebtn={handlebtn} headCells={headCells} rows={rows} />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default AllproductsView;
