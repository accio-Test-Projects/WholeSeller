import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import AdminLandingPage from "../components/Admin/AdminLandingPage";
import AdminLogin from "../components/Auth/AdminAuth";
import AllOrders from "../components/Admin/AllOrders";
import AllProducts from "../components/Admin/AllProducts";

import LandingPage from "../components/LandingPage";
import UserAuth from "../components/Auth/UserAuth";
import CategoryPage from "../components/CategoryPage";
import Product from "../components/Product";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Success from "../components/Checkout/Success";

function Navs() {
  const ProtectedRoutes = ({ type }) => {
    if (
      // user is logged in
      true
    ) {
      // if type is admin
      return <Outlet />;
    } else {
      // user is not logged in

      // if type is admin
      if (type === "admin") {
        return <Navigate to="/admin/login" />;
      }
      // if type is user
      else if (type === "user") {
        return <Navigate to="/login" />;
      }
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<UserAuth />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/product/:id" element={<Product />} />

        <Route element={<ProtectedRoutes type={"user"} />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoutes type={"admin"} />}>
          <Route path="/admin/landingPage" element={<AdminLandingPage />} />
          <Route path="/admin/products" element={<AllProducts />} />
          <Route path="/admin/orders" element={<AllOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navs;

// routes
//? admin routes
// admin auth --> /admin/login
// admin product --> /admin/products
// admin orders --> /admin/orders
// admin landing page --> /admin/landingPage

//? user routes
// user auth --> /login
// user landing page --> /
// category page --> /category/:id
// product page --> /product/:id
// cart page --> /cart
// checkout page --> /checkout
// success page --> /success
// user profile --> /profile
