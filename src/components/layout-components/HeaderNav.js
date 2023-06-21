import React, { useState } from "react";

import { Layout } from "antd";

import Logo from "./Logo";

import NavProfile from "./NavProfile";

const { Header } = Layout;

export const HeaderNav = () => {
  return (
    <Header
      className={`app-header `}
      style={{ backgroundColor: "rgb(54 75 101)", height: "5rem" }}
    >
      <div className={`app-header-wrapper layout-top-nav`}>
        <Logo />
        <div className="nav" style={{ width: `calc(100%)` }}>
          <div className="nav-right">
            <NavProfile />
          </div>
        </div>
      </div>
    </Header>
  );
};

export default HeaderNav;
