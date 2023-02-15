import React from "react";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import FileUpload from '../../common/FileUpload';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../fierbaseconfig";
function Corousel() {
  const [corousel, setCorousel] = React.useState([1]);
  const addmore = () => {
    setCorousel([...corousel, 1]);
  };
  const removethisCorousel = (index) => {
    const newCorousel = corousel.filter((item, i) => i !== index);
    setCorousel(newCorousel);
  }
  const setCorouselfun = (key, value, index) => {
    const newCorousel = corousel.map((item, i) => {
      if(i === index) {
        return {
          ...item,
          [key]: value
        }
      }
      return item;
    })
    setCorousel(newCorousel);
  }
  const submitData = async(e) => {
    e.preventDefault();
    console.log(corousel);
      // call firebase function to save the corosols in landingpagesections collection
      try {
        await setDoc(doc(db, "landingpagesections", "corousel"), {
          corousels: corousel,
        });
        alert("saved successfully");
      } catch (err) {
        alert("something went wrong");
        console.log(err);
      }
  }
  return (
    <form 
    onSubmit={(e) => submitData(e)}
    className="container">
      <div className="corousel-container">
        <div
          style={{
            display: "flex",
            width: "fit-content",
          }}
        >
          {corousel.map((item, index) => {
            return (
              <div 
              key={index}
              className="corousel-item">
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    right: " -15px",
                    color: "red",
                  }}
                  onClick={() => removethisCorousel(index)}
                >
                  <CancelTwoToneIcon fontSize="large" />
               
                </div>
                <div>
                    <FileUpload
                    data={item.img}
                    setData={(url) =>setCorouselfun('img', url, index)}
                    />
                     <div>
                    <input
                    value={item.title}
                    onChange={(e) => setCorouselfun('title', e.target.value, index)}
                    />
                    <input
                    value={item.description}
                    onChange={(e) => setCorouselfun('description', e.target.value, index)}
                    />
                  </div>
                  </div>
                 
              </div>
            );
          })}
          <div onClick={addmore} className="corousel-add-item">
            <AddCircleOutlineTwoToneIcon fontSize="large" />
          </div>
        </div>
      </div>
      <div className="save-btn-container">
        <button
        disabled={corousel.length === 0}
        type="submit"
        >Save</button>
      </div>
    </form>
  );
}

export default Corousel;
