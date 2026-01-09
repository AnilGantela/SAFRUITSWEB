// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomeContent from "./pages/HomeContent";
import Layout from "./pages/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Dashboard routes with sidebar */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomeContent />} />
          <Route path="/products" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
