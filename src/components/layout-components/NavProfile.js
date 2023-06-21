import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from "react-redux";
import {
  HomeOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Icon from "components/util-components/Icon";
import { signOut } from "redux/actions/Auth";
import { PROFILE_URL } from "redux/constants/Auth";
import { useHistory } from "react-router-dom";
import utils from "utils";
import { useAuth } from "contexts/AuthContext";
import { logOut } from "api/ComponentController/NavProfileController";
import { Link } from "react-router-dom";
import { AUTH_TOKEN } from "redux/constants/Auth";
const menuItem = [
  {
    title: "Profile Pages",
    icon: HomeOutlined,
    path: `/home/account/settings/profile/${localStorage.getItem(AUTH_TOKEN)}`,
  },
  {
    title: "Edit Profile",
    icon: EditOutlined,
    path: "/home/account/settings/edit-profile",
  },
  {
    title: "Account Setting",
    icon: SettingOutlined,
    path: "/home/account/settings/security",
  },
  {
    title: "Billing",
    icon: ShopOutlined,
    path: "/home/account/settings/billing",
  },
];
const menuItem2 = [
  // {
  //   title: "FAQ & Support",
  //   icon: QuestionCircleOutlined,
  //   path: "/",
  // },
  {
    title: "Create Organization",
    icon: QuestionCircleOutlined,
    path: "/home/schedule/demo",
  },
  // {
  //   title: "Help Center",
  //   icon: QuestionCircleOutlined,
  //   path: "/#",
  // },
];
export const NavProfile = ({ signOut }) => {
  let history = useHistory();
  const [current, setCurrent] = useState();
  const { currentUser, generateToken } = useAuth();
  const [timer, setTimer] = useState(false);

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem(PROFILE_URL) || "[]")
  );
  const user =
    currentUser?.displayName != null ? currentUser.displayName : "N/A";

  const handleClick = (e) => {
    setCurrent(e.key);

    history.push(e.key);
    setCurrent(null);
  };

  const signOutNode = () => {
    logOut(signOut, generateToken);
  };
  React.useEffect(() => {
    if (!timer) {
      const timeoutId = setTimeout(() => {
        setTimer(true);
      }, 1500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [timer]);
  React.useEffect(() => {
    const profile = JSON.parse(localStorage.getItem(PROFILE_URL) || "[]");
    setProfile(profile);
  }, []);
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
          <Menu.Item key={menuItem.length + 1} onClick={(_) => signOutNode()}>
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
      <div className="nav-profile-body-2">
        <Menu onClick={handleClick} selectedKeys={[current]}>
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
    </div>
  );
  return (
    <>
      {timer ? (
        <Dropdown
          placement="bottomRight"
          overlay={profileMenu}
          trigger={["click"]}
        >
          <Menu
            className="d-flex align-item-center avatar-top"
            mode="horizontal"
          >
            <Menu.Item key="profile">
              {profile?.profile_data ? (
                <Avatar
                  src={profile?.profile_data}
                  //   style={{ backgroundColor: profile?.profile_color }}
                  size={45}
                >
                  <b> {utils.getNameInitial(user)} </b>
                </Avatar>
              ) : (
                <Avatar
                  src={profile?.profile_data}
                  size={45}
                  style={{ backgroundColor: profile?.profile_color }}
                >
                  <b> {utils.getNameInitial(user)} </b>
                </Avatar>
              )}
            </Menu.Item>
          </Menu>
        </Dropdown>
      ) : null}
    </>
  );
};

export default connect(null, { signOut })(NavProfile);
