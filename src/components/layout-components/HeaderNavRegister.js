import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Button } from "antd";
import Logo from "./Logo";
import { toggleCollapsedNav, onMobileNavToggle } from "redux/actions/Theme";
import NavProfileRegister from "./NavProfileRegister";
import utils from "utils";
import { LoginOutlined } from "@ant-design/icons";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

export const HeaderNavRegister = (props) => {
  const { about, welcome, campaign, schedule } = useAuth();
  let history = useHistory();

  const { headerNavColor, isMobile, currentTheme } = props;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  const handleClick1 = () => {
    schedule.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleClick2 = () => {
    about.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleClick3 = () => {
    campaign.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleClick4 = () => {
    welcome.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleClick5 = () => {
    history.push(`/auth`);
  };
  useEffect(
    () => {
      const listener = window.addEventListener(
        "resize",
        updateWindowDimensions
      );
      updateWindowDimensions();
      return listener;
    },
    [height],
    [width]
  );
  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(
        currentTheme === "dark" ? "#00000" : "#ffffff"
      );
    }
    return utils.getColorContrast(headerNavColor);
  };
  const navMode = mode();

  return (
    <Header
      className={`app-header ${navMode}`}
      style={{ backgroundColor: "rgb(54 75 101)", height: "5rem" }}
    >
      <div className="nav" style={{ width: `calc(100%)` }}>
        <div className={`app-header-wrapper  layout-top-nav`}>
          <Logo logoType={navMode} width={width} />

          <div className="nav-right">
            {/* <NavMessage /> */}
            {width > 643 ? (
              <>
                {" "}
                <ul className="ant-menu ant-menu-root ant-menu-horizontal ">
                  <li
                    onClick={handleClick2}
                    className="ant-menu-item ant-menu-item-only-child home-tag "
                  >
                    <span className="home-tag" style={{ color: "white" }}>
                      About
                    </span>
                  </li>
                  <li
                    onClick={handleClick4}
                    className="ant-menu-item ant-menu-item-only-child home-tag "
                  >
                    <span className="home-tag " style={{ color: "white" }}>
                      Welcome
                    </span>
                  </li>
                  <li
                    onClick={handleClick3}
                    className="ant-menu-item ant-menu-item-only-child home-tag "
                  >
                    <span className="home-tag " style={{ color: "white" }}>
                      Campaign
                    </span>
                  </li>
                  <li
                    onClick={handleClick1}
                    className="ant-menu-item ant-menu-item-only-child home-tag "
                  >
                    <span className="home-tag " style={{ color: "white" }}>
                      Schedule
                    </span>
                  </li>
                  <li
                    onClick={handleClick5}
                    className="ant-menu-item ant-menu-item-only-child home-tag "
                  >
                    <span className="home-tag " style={{ color: "white" }}>
                      Login
                    </span>
                  </li>
                </ul>
              </>
            ) : (
              <></>
            )}

            <NavProfileRegister width={width} />
          </div>
        </div>
      </div>
    </Header>
  );
};

const mapStateToProps = ({ theme }) => {
  const { headerNavColor, isMobile, currentTheme } = theme;
  return {
    headerNavColor,
    isMobile,
    currentTheme,
  };
};

export default connect(mapStateToProps, {
  toggleCollapsedNav,
  onMobileNavToggle,
})(HeaderNavRegister);
