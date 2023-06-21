import React from "react";
import { MessageOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const NavMessage = () => {
  return (
    <>
      <Link
        to="/home/apps/chat"
        style={{
          padding: "0px 1rem",
          paddingTop: 2.5,
          marginTop: "0px",
          lineHeight: "70px",
        }}
      >
        <MessageOutlined className="nav-icon" style={{ color: "white" }} />
      </Link>
    </>
  );
};
