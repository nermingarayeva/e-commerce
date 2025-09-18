import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import App from "../pages/App";
import Basket from "../pages/Basket";
import NewArrivals from "../pages/NewArrivals";
import ProductDetailPageWithBoundary from "../pages/ProductDetailPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
<Route path="/" element={<div><Layout /><Home /></div>} />
        <Route path="/shop" element={<div><Layout/><App /></div>} />
        <Route path="/products/:productid" element={<ProductDetailPageWithBoundary />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/newarrivals" element={<div><Layout/><NewArrivals /></div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
