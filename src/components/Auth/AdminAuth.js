import React, { useContext } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../fierbaseconfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../coxtext/userContext";
function AdminAuth() {
  const provider = new GoogleAuthProvider();
const navigate=useNavigate();
const [userState, dispatch] =useContext(userContext)
console.log(userState,'userState')
  const signIn = async () => {

    signInWithPopup(auth, provider)
      .then(async(result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result, "result");
        const {user} = result;

        //1. after we get the user info , retrive the email
        const {email,displayName} = user;
        // call firestore 'admins' collection and check if the email is present as a document id
        const docRef= doc(db, "admins", email);
        const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        alert("you are an admin");
        dispatch({
          type:"SIGNIN",
          payload:{
            userType:"admin",
            userinfo:{
              email:email,
              displayName:displayName,
            }
          }
        })
        navigate("/admin/products");

      }

      else{
        alert("you are not an admin");
      }
        // if yes, then the user is an admin
        // if no, then the user is not an admin show a message


      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>AdminAuth</h1>
      <button onClick={signIn}>SignIn</button>
    </div>
  );
}

export default AdminAuth;
