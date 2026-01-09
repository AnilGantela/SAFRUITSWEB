import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SideNavBarContainer, NavItem } from "./styledComponents";
import Cookies from "js-cookie";

const SideNavBar = () => {
  useEffect(() => {
    const token = Cookies.get("saFruitsToken");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <SideNavBarContainer>
      <ul>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/products">Products</Link>
        </NavItem>
        <NavItem>
          <Link to="/orders">Orders</Link>
        </NavItem>
        <NavItem>
          <Link to="/customers">Customers</Link>
        </NavItem>
      </ul>
    </SideNavBarContainer>
  );
};

export default SideNavBar;
