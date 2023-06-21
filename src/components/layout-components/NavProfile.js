import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from "react-redux";
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { signOut } from "redux/actions/Auth";
import utils from "utils";
import { auth } from "auth/FirebaseAuth";

const menuItem = [
  {
    title: "Help Center",
    icon: QuestionCircleOutlined,
    path: "/pre/help-center",
  },
];
let colortag = [
  "0085c3",
  "7ab800",
  "f2af00",
  "dc5034",
  "ce1126",
  "0085c3",
  "FF1493",
  "AA47BC",
];
export const NavProfile = ({ signOut }) => {
  const { currentUser } = auth;
  console.log(currentUser);
  const [profile, setProfile] = useState(JSON.parse("[]"));
  const [timer, setTimer] = useState(false);
  const user =
    currentUser?.displayName != null ? currentUser.displayName : "N/A";
  const signOutNode = () => {
    signOut();
  };
  let randomColor = colortag[Math.floor(Math.random() * colortag.length)];

  console.log(randomColor);
  const profileMenu = (
    <div className="nav-profile-body">
      <Menu>
        <Menu.Item key={1} onClick={() => signOutNode()}>
          <span>
            <LogoutOutlined className="mr-3" style={{ marginRight: 5 }} />
            <span className="font-weight-normal">Sign Out</span>
          </span>
        </Menu.Item>
      </Menu>
    </div>
  );
  return (
    <>
      <Dropdown
        placement="bottomRight"
        overlay={profileMenu}
        trigger={["click"]}
      >
        <Menu className="d-flex align-item-center" mode="horizontal">
          <Menu.Item key="profile">
            {profile?.profile_data ? (
              <Avatar src={profile?.profile_data} size={45}>
                <b> {utils.getNameInitial(user)} </b>{" "}
              </Avatar>
            ) : (
              <Avatar
                src={`https://ui-avatars.com/api/name=${user}&background=${randomColor}&color=FFFFFF&bold=true`}
                size={45}
                style={{ backgroundColor: profile?.profile_color }}
              >
                <b> {utils.getNameInitial(user)} </b>{" "}
              </Avatar>
            )}
          </Menu.Item>
        </Menu>
      </Dropdown>
    </>
  );
};
function toBase64(arr) {
  //arr = new Uint8Array(arr) if it's an ArrayBuffer
  return Buffer.from(
    arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
  ).toString("base64");
}

export default connect(null, { signOut })(NavProfile);
