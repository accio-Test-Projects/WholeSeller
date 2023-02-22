import React from "react";
import Card from "../../common/Card";
import './newarrival.css'
function NewArrivals({ data }) {
  return (
    <div>
      <h1>
        New Arrivals
      </h1>
    <div
    className="bestSeller-container"
    >
      {data.map((item, index) => {
        return <Card data={item} key={index} />;
      })}
    </div>
    </div>
  );
}

export default NewArrivals;
