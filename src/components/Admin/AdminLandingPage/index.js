import React from "react";
import CategoryBar from "./CategoryBar";
import Corousel from "./Corousel";
import NewArivals from "./NewArivals";
import BestSellers from "./BestSellers";
import './adminLandingpage.css'
function AdminLandingPage() {
  return (
    <div>
      <CategoryBar />
      <Corousel />
      <NewArivals />
      <BestSellers />
    </div>
  );
}

export default AdminLandingPage;
