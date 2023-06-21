import React, { useState } from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from "react-redux";
import {
  SettingOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import Icon from "components/util-components/Icon";
import { signOut } from "redux/actions/Auth";
import { useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

import { Link } from "react-router-dom";
const menuItem = [
  {
    title: "Sign up",
    icon: LoginOutlined,
    path: `/auth`,
  },
  {
    title: "Privacy Policy",
    icon: EditOutlined,
    path: "/support/privacy-policy",
  },
  {
    title: "Term & Condition",
    icon: SettingOutlined,
    path: "/support/term-condition",
  },
];
const menuItem2 = [
  {
    title: "About",
    icon: QuestionCircleOutlined,
    path: "about",
  },
  {
    title: "Welcome",
    icon: QuestionCircleOutlined,
    path: "welcome",
  },
  {
    title: "Campaign",
    icon: QuestionCircleOutlined,
    path: "campaign",
  },
  {
    title: "Schedule",
    icon: QuestionCircleOutlined,
    path: "schedule",
  },
];
let colorTag = [
  "#0085c3",
  "#7ab800",
  "#f2af00",
  "#dc5034",
  "#ce1126",
  "#0085c3",
  "#FF1493",
  "#AA47BC",
];
const randomColor = Math.floor(Math.random() * colorTag.length);
export const NavProfile = (props) => {
  const { width } = props;
  const { about, welcome, campaign, schedule } = useAuth();
  console.log(props);
  let history = useHistory();
  const [current, setCurrent] = useState();

  const handleClick = (e) => {
    setCurrent(e.key);
    setCurrent(null);

    return history.push(e.key);
  };
  const handleClickWelcome = (e) => {
    if (e.key == "about")
      return about.current?.scrollIntoView({ behavior: "smooth" });
    if (e.key == "welcome")
      return welcome.current?.scrollIntoView({ behavior: "smooth" });
    if (e.key == "campaign")
      return campaign.current?.scrollIntoView({ behavior: "smooth" });
    if (e.key == "schedule")
      return schedule.current?.scrollIntoView({ behavior: "smooth" });
  };
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header" />
      <div className="nav-profile-body">
        <Menu onClick={handleClick} selectedKeys={[current]}>
          {menuItem.map((el, _) => {
            return (
              <Menu.Item key={el.path}>
                <Link to={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
      {width < 643 ? (
        <>
          <div className="nav-profile-body-2">
            <Menu onClick={handleClickWelcome} selectedKeys={[current]}>
              {menuItem2.map((el, _) => {
                return (
                  <Menu.Item key={el.path}>
                    <Link to={el.path}>
                      <Icon className="mr-3" type={el.icon} />
                      <span className="font-weight-normal">{el.title}</span>
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
        </>
      ) : null}
    </div>
  );
  return (
    <>
      <Dropdown
        placement="bottomRight"
        overlay={profileMenu}
        trigger={["click"]}
      >
        <Menu
          className="d-flex align-item-center avatar-top home-tag-2"
          mode="horizontal"
        >
          <Menu.Item key="profile">
            <Avatar
              size={45}
              icon={
                <UserOutlined
                  className="home-tag-2"
                  style={{ fontSize: "25px", marginRight: "0px" }}
                />
              }
              style={{ backgroundColor: colorTag[randomColor] }}
            />
          </Menu.Item>
        </Menu>
      </Dropdown>
    </>
  );
};

export default connect(null, { signOut })(NavProfile);
