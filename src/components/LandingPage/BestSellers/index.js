import React from "react";
import './bestseller.css'
import Card from "../../common/Card";
function BestSellers({ data }) {
  return (
    <div>
      <h1>BestSellers</h1>
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

export default BestSellers;
