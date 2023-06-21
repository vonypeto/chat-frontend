import React from "react";

import { APP_NAME } from "configs/AppConfig";
import { connect } from "react-redux";
import utils from "utils";
import { Grid } from "antd";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;

const getLogo = () => {
  return "/favicon.ico";
};

export const Logo = (props) => {
  return (
    <div style={{ width: "auto", marginLeft: 25 }}>
      <Link to="/home">
        <img src={getLogo(props)} alt={`${APP_NAME} logo`} />
        {/* <h2 style={{color: "white", fontFamily: "Calibri", fontWeight: "bolder", paddingTop: "7px"}}>MiBarangay</h2> */}
      </Link>
    </div>
  );
};

export default Logo;
