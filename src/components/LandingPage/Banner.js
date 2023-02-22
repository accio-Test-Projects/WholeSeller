import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function Banner({ data }) {
  return (
    <Carousel>
      {data.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper>
      <div
        style={{
          backgroundImage: `url(${props.item.img})`,
          height: "400px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>{props.item.title}</h2>
        <p>{props.item.description}</p>
      </div>
    </Paper>
  );
}

export default Banner;
