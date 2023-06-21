import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Logo from "./Logo";
import NavNotification from "./NavNotification";
import NavProfile from "./NavProfile";
import NavLanguage from "./NavLanguage";
import NavPanel from "./NavPanel";
import NavSearch from "./NavSearch";
import SearchInput from "./NavSearch/SearchInput.js";
import { toggleCollapsedNav, onMobileNavToggle } from "redux/actions/Theme";
import {
  NAV_TYPE_TOP,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from "constants/ThemeConstant";
import utils from "utils";

const { Header } = Layout;

export const HeaderNav = (props) => {
  const {
    navCollapsed,
    mobileNav,
    navType,
    headerNavColor,
    toggleCollapsedNav,
    onMobileNavToggle,
    isMobile,
    currentTheme,
    direction,
  } = props;
  const [searchActive, setSearchActive] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const onSearchActive = () => {
    setSearchActive(true);
  };

  const handleSearchItem = (item) => {
    setSearchItem(item);
  };
  const onSearchClose = () => {
    setSearchActive(false);
  };
  console.log(width);
  const onToggle = () => {
    if (!isMobile) {
      toggleCollapsedNav(!navCollapsed);
    } else {
      onMobileNavToggle(!mobileNav);
    }
  };

  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(
        currentTheme === "dark" ? "#00000" : "#ffffff"
      );
    }
    return utils.getColorContrast(headerNavColor);
  };
  const navMode = mode();
  const getNavWidth = () => {
    if (isNavTop || isMobile) {
      return "0px";
    }
    if (navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
    } else {
      return `${SIDE_NAV_WIDTH}px`;
    }
  };
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  // useEffect(() => {
  //   if (!isMobile) {
  //     onSearchClose();
  //   }
  // });
  useEffect(() => {
    const listener = window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    return () => window.removeEventListener("resize", listener);
  }, []);

  return (
    <Header
      className={`app-header ${navMode}`}
      style={{ backgroundColor: "rgb(54 75 101)", height: "5rem" }}
    >
      <div className={`app-header-wrapper ${isNavTop ? "layout-top-nav" : ""}`}>
        <Logo logoType={navMode} width={width} />
        <div className="nav" style={{ width: `calc(100% - ${getNavWidth()})` }}>
          <div className="nav-left">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal ">
              <li
                className="ant-menu-item ant-menu-item-only-child header-hide-2"
                onClick={() => {
                  onSearchActive();
                }}
              >
                <SearchOutlined
                  className="mr-0 nav-icon"
                  style={{ color: "white" }}
                />
              </li>

              <li
                className="ant-menu-item ant-menu-item-only-child header-hide"
                style={{ cursor: "auto" }}
              >
                <SearchInput
                  mode={mode}
                  isMobile={true}
                  searchItem={searchItem}
                  handleSearchItem={handleSearchItem}
                />
              </li>
            </ul>
          </div>
          <div className="nav-right">
            {/* <MessageOutlined style={{color: "white", fontSize: "1.35em"}}/> */}
            {/* <NavMessage /> */}
            <NavNotification />
            <NavPanel direction={direction} />
            <NavProfile />
          </div>
        </div>
      </div>{" "}
      <NavSearch
        active={searchActive}
        searchItem={searchItem}
        handleSearchItem={handleSearchItem}
        close={onSearchClose}
      />
    </Header>
  );
};

const mapStateToProps = ({ theme }) => {
  const {
    navCollapsed,
    navType,
    headerNavColor,
    mobileNav,
    currentTheme,
    direction,
  } = theme;
  return {
    navCollapsed,
    navType,
    headerNavColor,
    mobileNav,
    currentTheme,
    direction,
  };
};

export default connect(mapStateToProps, {
  toggleCollapsedNav,
  onMobileNavToggle,
})(HeaderNav);
