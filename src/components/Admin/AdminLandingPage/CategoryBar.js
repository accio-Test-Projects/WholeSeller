import React, { useEffect } from "react";
import { categories } from "../../../constents";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../fierbaseconfig";

function CategoryBar() {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const getSelectedCategory = async () => {
    const docRef = doc(db, "landingpagesections", "categorybar");
    const docSnap = await getDoc(docRef);
    let allcategories = [];
    if (docSnap.exists()) {
      allcategories = docSnap.data().allcategories;
    } else {
      console.log("No such document!");
    }
    setSelectedCategory(allcategories);
  };
  useEffect(() => {
    getSelectedCategory();
  }, []);
  const removethiscategory = (index) => {
    const newSelectedCategory = selectedCategory.filter((item, i) => {
      return i !== index;
    });
    setSelectedCategory(newSelectedCategory);
  };
  const saveCategoryBar = async () => {
    console.log(selectedCategory);
    // call firebase function to save the selected category in landingpagesections collection
    try {
      await setDoc(doc(db, "landingpagesections", "categorybar"), {
        allcategories: selectedCategory,
      });
      alert("saved successfully");
    } catch (err) {
      alert("something went wrong");
      console.log(err);
    }
  };
  return (
    <div className="container">
         <h1>
        Category Bar
      </h1>
      <div className="selected-item">
        {selectedCategory && selectedCategory.length === 0 ? (
          <div>select category</div>
        ) : selectedCategory && selectedCategory.length > 0 ? (
          // selectedCategory&&selectedCategory.length>0 ?

          selectedCategory.map((category, index) => {
            return (
              <div key={index} onClick={() => removethiscategory(index)}>
                {category.label}
              </div>
            );
          })
        ) : (
          <h2>loading</h2>
        )}
      </div>
      <div className="options-row">
        {categories.map((category) => {
          return (
            <div
              key={category.value}
              onClick={() =>
                setSelectedCategory([...selectedCategory, category])
              }
            >
              {category.label}
            </div>
          );
        })}
      </div>
      <div className="save-btn-container">
        <button
          disabled={!selectedCategory||selectedCategory&&selectedCategory.length === 0}
          onClick={saveCategoryBar}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CategoryBar;
