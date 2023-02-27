import React, { useContext } from "react";
import './bestseller.css'
import Card from "../../common/Card";
import { cartContext } from "../../../coxtext/cartContext";
function BestSellers({ data }) {
  const [cartState, dispatch] = useContext(cartContext);
  const AddToCart=(e,item)=>{
    e.stopPropagation()
    dispatch({type:"ADD_ITEM_TO_CART",payload:item})
    
  }
  const removeProduct=(e,item)=>{
    e.stopPropagation()
    dispatch({type:"REMOVE_ITEM_FROM_CART",payload:item})
  }
  return (
    <div>
      <h1>BestSellers</h1>
    <div
    className="bestSeller-container"
    >
      {data.map((item, index) => {
        return <Card
        removeProduct={removeProduct}
        AddToCart={AddToCart}
        data={item} key={index} />;
      })}
    </div>
    </div>
  );
}

export default BestSellers;
