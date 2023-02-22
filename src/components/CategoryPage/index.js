import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../fierbaseconfig";
import Card from "../common/Card";

function CategoryPage() {
  const param = useParams();
  const { id } = param;
  const [products, setProducts] = useState(null);
  const getAllCategoryProducts = async () => {
    // fetch all products from firestore product collection where category is id
    const q = query(collection(db, "products"), where("category", "==", id));
    const querySnapshot = await getDocs(q);
    let allProducts = [];
    querySnapshot.forEach((doc) => {
      allProducts.push({ ...doc.data()});
    });
    setProducts(allProducts);
  };
  useEffect(() => {
    getAllCategoryProducts();
  }, []);

  return (
    <div  className="bestSeller-container">
      {products ? (
        products.map((product) => {
          return <Card data={product} key={product.product_id} />;
        })
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default CategoryPage;
