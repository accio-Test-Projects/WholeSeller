//1 initilize the context
//2 initilize the initial states
//3 create the reducer
//4 create the provider

import { createContext, useEffect, useReducer } from "react";

export const userContext = createContext();

const initialState =JSON.parse(localStorage.getItem("user")) || {
  userType: null,
  userinfo: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      const data = action.payload;
      localStorage.setItem("user", JSON.stringify({...data}));
      return {
        userType: data.userType,
        userinfo: data.userinfo,
      };

    case "SIGNOUT":
      localStorage.clear();
      return {
        userType: null,
        userinfo: null,
      };
   
    default:
  }
};

export const UserProvider=({children})=>{
  const [userState, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    console.log(userState,'userState')
  }, [userState]);

  return (
    <userContext.Provider value={[userState,dispatch]}>
      {children}
    </userContext.Provider>
  );
}