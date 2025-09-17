import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import App from "../pages/App";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} />
        <Route path="/" element={<Home />} />
        <Route path="/newarrivals" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
