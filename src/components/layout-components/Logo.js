import React from "react";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_TOP,
} from "constants/ThemeConstant";
import { APP_NAME } from "configs/AppConfig";
import { connect } from "react-redux";
import utils from "utils";
import { Grid } from "antd";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;

const getLogoWidthGutter = (props, isMobile) => {
  const { navCollapsed, navType } = props;
  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  if (isMobile && !props.mobileLogo) {
    return 0;
  }
  if (isNavTop) {
    return "auto";
  } else {
    return "auto";
  }
  // if (navCollapsed) {
  //   return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
  // } else {
  //   return `${SIDE_NAV_WIDTH}px`;
  // }
};

const getLogo = (props) => {
  const { navCollapsed, logoType, width } = props;

  if (logoType === "light") {
    if (navCollapsed) {
      return "/img/logo-sm-white.png";
    }
    return "/img/logo-white.png";
  }

  if (width <= 850) {
    return "/img/logo-sm.png";
  }
  return "/img/logo.png";
};

const getLogoDisplay = (isMobile, mobileLogo) => {
  if (isMobile && !mobileLogo) {
    return "logo";
  } else {
    return "logo";
  }
};

export const Logo = (props) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  return (
    <div
      className={getLogoDisplay(isMobile, props.mobileLogo)}
      style={{ width: "auto" }}
    >
      <Link to="/home/feeds">
        <img
          src={getLogo(props)}
          alt={`${APP_NAME} logo`}
          style={{ filter: `brightness(${props.width >= 850 ? 100 : 2.3})` }}
        />
        {/* <h2 style={{color: "white", fontFamily: "Calibri", fontWeight: "bolder", paddingTop: "7px"}}>MiBarangay</h2> */}
      </Link>
    </div>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType } = theme;
  return { navCollapsed, navType };
};

export default connect(mapStateToProps)(Logo);
