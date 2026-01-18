// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeContent from "./pages/HomeContent";
import Layout from "./pages/Layout";
import Cities from "./pages/Cities";
import Products from "./pages/Products";
import Shipments from "./pages/Shipments";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import ShipmentDetailView from "./components/ShipmentDetailView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Dashboard routes with sidebar */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomeContent />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/products" element={<Products />} />
          // App.jsx or router config
          <Route path="/shipments">
            <Route index element={<Shipments />} />
            <Route path=":shipmentId" element={<ShipmentDetailView />} />
          </Route>
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/:shipmentId" element={<ShipmentDetailView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
