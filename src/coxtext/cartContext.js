//1 initilize the context
//2 initilize the initial states
//3 create the reducer
//4 create the provider

import { createContext, useEffect, useReducer } from "react";

export const cartContext = createContext();

const initialState = JSON.parse(localStorage.getItem("cart")) || [];
const cartReducer = (state = initialState, action) => {
  var data = [];
  var exist = null;
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      data = [];
      data = [...state];
      exist = data.find((item) => item.product_id === action.payload.product_id);
      console.log(exist, "exist");
      if (exist) {
        data = data.map((item) => {
          if (item.product_id === action.payload.product_id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      } else {
        data = [...data, { ...action.payload, qty: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify([...data ]));
      return data

    case "REMOVE_ITEM_FROM_CART":
      data = [...state];
      exist = data.find((item) => item.product_id === action.payload.product_id);
      if (exist.qty === 1) {
        data = data.filter(
          (item) => item.product_id !== action.payload.product_id
        );
      } else {
        data = data.map((item) => {
          if (item.product_id === action.payload.product_id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
      localStorage.setItem("cart", JSON.stringify([...data ]));
      return data

    case "CLEAR_CART":
      localStorage.clear();
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    console.log(cartState, "cartState");
  }, [cartState]);

  return (
    <cartContext.Provider value={[cartState, dispatch]}>
      {children}
    </cartContext.Provider>
  );
};
