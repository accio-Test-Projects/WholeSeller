import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
function Card({ data }) {
  console.log(data);
  const navigate=useNavigate()
  const redirectToProduct = () => {
    navigate(`/product/${data.product_id}`)

  }
  return (
    <div>
      <div
      onClick={redirectToProduct}
        style={{
          backgroundImage: `url(${data.image})`,
          height: "300px",
          width: "200px",
          position: "relative",
          cursor: "pointer",
          
        }}
      >
        <div
        className="card-add-to-cart"
        >

       
          <div>
            <FavoriteBorderIcon />
          </div>
          <div>
            <ShoppingCartIcon />
            Shop Now
          </div>
        </div>
      </div>
      <div>
        <h3>{data.product_name}</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>{data.category}</div>
          <div>{data.price}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
