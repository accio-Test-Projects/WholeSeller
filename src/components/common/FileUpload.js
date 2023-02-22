import { TextField } from "@mui/material";
import React, { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { storage } from "../../fierbaseconfig";
function FileUpload({ setData, datakey, data }) {
  const [progress, setProgress] = useState(0);
  const upload = (e) => {
    const file = e.target.files[0];
    console.log(file);

    //1 initialize storage
    const storageRef = ref(storage, `image/${file.name}`); //2 create a storage reference

    const uploadTask = uploadBytesResumable(storageRef, file); //3 call the upload function

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + p + "% done");
        setProgress(p);
      },

      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },

      () => {
        // Handle successful uploads on complete

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setData(downloadURL);
          setProgress(0);
        });
      }
    );
  };
  return progress > 0 ? (
    <div>{progress}</div>
  ) : data ? (
    <div
    style={{
      position: "relative",
    }}
    >
       <div
        style={{
          position: "absolute",
          color: "red",
        }}
        onClick={() => setData(null)}
       > <CancelTwoToneIcon  /></div>
      <img 
    width={'50%'}
    style={{
      maxWidth: "100px",
    }}
    src={data} alt="product" /></div>
  ) : (
    <TextField
      sx={{
        fieldset: {
          border: "1px solid #00000021",
          borderRadius: "10px",
        },
      }}
      onChange={(e) => upload(e)}
      type="file"
      inputProps={{
        accept: "image/*",
      }}
      fullWidth
      size="small"
    />
  );
}

export default FileUpload;
