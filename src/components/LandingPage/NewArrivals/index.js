import React, { useContext } from "react";
import { cartContext } from "../../../coxtext/cartContext";
import Card from "../../common/Card";
import './newarrival.css'
function NewArrivals({ data }) {
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
      <h1>
        New Arrivals
      </h1>
    <div
    className="bestSeller-container"
    >
      {data.map((item, index) => {
        return <Card data={item} key={index} AddToCart={AddToCart} removeProduct={removeProduct} />;
      })}
    </div>
    </div>
  );
}

export default NewArrivals;
