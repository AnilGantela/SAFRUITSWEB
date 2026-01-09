import React, { Component } from "react";
import {
  ContentContainer,
  HomeContainer,
  SideNavContainer,
} from "./styledComponents";
import SideNavBar from "../../components/SideNavBar";
import { Outlet } from "react-router-dom";

class Layout extends Component {
  render() {
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
  }
}

export default Layout;
