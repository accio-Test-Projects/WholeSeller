import React, { useEffect } from "react";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../fierbaseconfig";
import AsyncDropdown from "../../common/AsyncDropdown";
function NewArivals() {
  const [productSearch, setProductSearch] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [dropdownProducts, setDropdownProducts] = React.useState([]);
  const [newArival, setNewArival] = React.useState(null);
  const getAllNewArivals = async () => {
    // call fire store in landingpagesections collection return document with doc id newArival
    const docref = doc(db, "landingpagesections", "newArival");
    const docSnap = await getDoc(docref);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setNewArival(docSnap.data().newArivals);
    }
  };
  useEffect(() => {
    getAllNewArivals();
  }, []);
  const removethisArival = (index) => {
    const newCorousel = newArival.filter((item, i) => i !== index);
    setNewArival(newCorousel);
  };
  const setNewArivalfun = () => {
    setNewArival([...newArival, selectedProduct]);
    setSelectedProduct(null);
  };
  const submitData = async (e) => {
    e.preventDefault();
    console.log(newArival);
    // call firebase function to save the corosols in landingpagesections collection
    try {
      await setDoc(doc(db, "landingpagesections", "newArival"), {
        newArivals: newArival,
      });
      alert("saved successfully");
    } catch (err) {
      alert("something went wrong");
      console.log(err);
    }
  };
  const getProducts = async (searchText) => {
    const q = query(collection(db, "products"), where("SKU", "==", searchText));
    const querySnapshot = await getDocs(q); // get all the products
    console.log(querySnapshot);
    let products = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      products.push(doc.data());
    });
    setDropdownProducts(products);
    console.log("--------");
  };
  useEffect(() => {
    if (productSearch) {
      // call firebase product collection and get the products which matches the search text or starts with the search text
      getProducts(productSearch);
    }
  }, [productSearch]);
  return (
    <form onSubmit={(e) => submitData(e)} className="container">
      <h2>
        New Arivals
      </h2>
      <div className="corousel-container">
        {newArival && newArival.length > 0 ? (
          <div
            style={{
              display: "flex",
              width: "fit-content",
            }}
          >
            {newArival.map((item, index) => {
              return (
                <div key={index} className="corousel-item">
                  <div
                    style={{
                      position: "absolute",
                      top: "-15px",
                      right: " -15px",
                      color: "red",
                    }}
                    onClick={() => removethisArival(index)}
                  >
                    <CancelTwoToneIcon fontSize="large" />
                  </div>
                  <div>
                    <div>
                      <img width="100px" src={item.image} alt="img" />
                    </div>
                    <h2>{item.product_name}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        ) : newArival && newArival.length === 0 ? (
          <div>no data</div>
        ) : (
          <div>loading</div>
        )}
      </div>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
        }}
        className="corousel-add-item"
      >
        <AsyncDropdown
          onChange={(value) => setSelectedProduct(value)}
          onTextChange={(text) => setProductSearch(text)}
          value={productSearch}
          options={dropdownProducts}
        />
        <div className="save-btn-container">
          <button
            type="button"
            disabled={selectedProduct === null}
            onClick={() => setNewArivalfun()}
          >
            SELECT
          </button>
        </div>
      </div>
      <div className="save-btn-container">
        <button disabled={newArival&&newArival.length === 0} type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

export default NewArivals;
