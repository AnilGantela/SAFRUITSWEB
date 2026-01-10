// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeContent from "./pages/HomeContent";
import Layout from "./pages/Layout";
import Cities from "./pages/Cities";
import Products from "./pages/Products";

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
