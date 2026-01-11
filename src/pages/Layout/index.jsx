import React, { useEffect } from "react";
import Cookies from "js-cookie";
import {
  ContentContainer,
  HomeContainer,
  SideNavContainer,
} from "./styledComponents";
import SideNavBar from "../../components/SideNavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  useEffect(() => {
    const token = Cookies.get("saFruitsToken");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <HomeContainer>
      <SideNavContainer>
        <SideNavBar />
      </SideNavContainer>
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </HomeContainer>
  );
};

export default Layout;
