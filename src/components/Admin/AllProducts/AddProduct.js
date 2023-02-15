import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { border, borderRadius } from "@mui/system";
import React, { useEffect } from "react";
import "./allproduct.css";
import { categories } from "../../../constents";
import { v4 as uuidv4 } from "uuid";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import FileUpload from "../../common/FileUpload";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../fierbaseconfig";
function AddProduct({selectedProduct}) {
  const [productData, setProductData] = React.useState({
    product_name: "", //
    price: "", //
    stock: "", //
    description: "",
    category: "", //
    image: "",
    SKU: "", //
    // if selectedProduct exist then we will have product_id in selectedProduct
  });

  useEffect(() => {
    if(selectedProduct){
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleDropDownChange = (key, value) => {
    setProductData({ ...productData, [key]: value });
  };
  const generateId = (key) => {
    setProductData({ ...productData, [key]: uuidv4() });
  };
  const saveData = async (e) => {

    e.preventDefault();
    const product_id = productData?.product_id?productData.product_id:uuidv4();
    // Add a new document in collection "products"
    //setDoc(doc refrence, data)
    // doc(db refrence, collection name, document id)
    try{
    await setDoc(doc(db, "products", product_id), {
      ...productData,
      product_id,
    });
    if(selectedProduct){
      alert("Product Updated");
    }
    else{
    alert("Product Added");
    }
  }
  catch(err){
    alert("Something went wrong");
    console.log(err);
  }
  };
  return (

    <form onSubmit={saveData}>
      <Grid container spacing={2}>
        <Grid className="add-product-field" item xs={12} sm={6}>
          <label htmlFor="name"> product Name</label>
          <TextField
            sx={{
              fieldset: {
                border: "1px solid #00000021",
                borderRadius: "10px",
              },
            }}
            required
            value={productData.product_name}
            onChange={(e) =>
              setProductData({ ...productData, product_name: e.target.value })
            }
            id="name"
            name="name"
            type="text"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid className="add-product-field" item xs={12} sm={6}>
          <label htmlFor="name">Price</label>
          <TextField
            required
            sx={{
              fieldset: {
                border: "1px solid #00000021",
                borderRadius: "10px",
              },
            }}
            type="number"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
            fullWidth
            size="small"
          />
        </Grid>
        <Grid className="add-product-field" item xs={12} sm={6}>
          <label htmlFor="name">Stock</label>
          <TextField
            required
            sx={{
              fieldset: {
                border: "1px solid #00000021",
                borderRadius: "10px",
              },
            }}
            type="number"
            value={productData.stock}
            onChange={(e) =>
              setProductData({ ...productData, stock: e.target.value })
            }
            fullWidth
            size="small"
          />
        </Grid>
        <Grid className="add-product-field" item xs={12} sm={6}>
          <label htmlFor="name">Category</label>
          <Select
            fullWidth
            required
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productData.category}
            onChange={(e) => handleDropDownChange("category", e.target.value)}
          >
            {categories.map((category) => {
              return (
                <MenuItem value={category.value}>{category.label}</MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid className="add-product-field" item xs={12} sm={6}>
          <label htmlFor="name">SKU</label>
          <TextField
            required
            sx={{
              fieldset: {
                border: "1px solid #00000021",
                borderRadius: "10px",
              },
            }}
            value={productData.SKU}
            onChange={(e) =>
              setProductData({ ...productData, SKU: e.target.value })
            }
            id="name"
            name="name"
            type="text"
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => generateId("SKU")}
                  position="start"
                >
                  <Tooltip title="Generate SKU">
                    <ShuffleOnIcon />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid className="add-product-field" item xs={12}>
          <label htmlFor="name"> Discription</label>
          <TextField
            required
            multiline
            minRows={5}
            sx={{
              fieldset: {
                border: "1px solid #00000021",
                borderRadius: "10px",
              },
            }}
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
            id="name"
            name="name"
            type="text"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid className="add-product-field" item xs={12}>
          <label htmlFor="name">Product Image</label>
          <FileUpload setData={setProductData} datakey="image" />
        </Grid>
        <Grid className="btn-container" item xs={12}>
          <Button type="submit">Save</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddProduct;
