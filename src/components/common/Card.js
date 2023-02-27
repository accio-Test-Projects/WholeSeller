import React, { useContext } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { cartContext } from "../../coxtext/cartContext";
function Card({ data, AddToCart,removeProduct }) {
  const [cartState, dispatch] = useContext(cartContext);
  const navigate = useNavigate();
  const redirectToProduct = () => {
    navigate(`/product/${data.product_id}`);
  };
  const inCart = cartState?.find((item) => item.product_id === data.product_id);
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
        <div className="card-add-to-cart">
          <div>
            <FavoriteBorderIcon />
          </div>
          {inCart && inCart.qty && inCart.qty > 0 ? (
            <div
              style={{
                gap: "20px",
                fontSize: "20px",
                border: "1px solid #fff",
                margin: "9px",
                borderRadius: "15px",
                padding: "3px",
              }}
            >
              <RemoveCircleOutlineRoundedIcon
              onClick={(e) => removeProduct(e, data)}
              fontSize="small" />
              {inCart.qty}
              <AddCircleOutlineRoundedIcon 
              onClick={(e) => AddToCart(e, data)}
              fontSize="large" />
            </div>
          ) : (
            <div onClick={(e) => AddToCart(e, data)}>
              <ShoppingCartIcon />
              Shop Now
            </div>
          )}
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
