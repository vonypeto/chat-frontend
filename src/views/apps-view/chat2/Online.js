import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Form, Input, Select, Button, Avatar } from "antd";
import utils from "utils";

const Online = (props) => {
  const { connectedUsers, randomColor, addCoversation } = props;
  return (
    <>
      <Col xs={5} sm={5} md={5} lg={5}>
        <div className=" border border-primary w-100 container">
          <h2>Online Users</h2>
        </div>
        <div className="user-list">
          {connectedUsers ? (
            <>
              {connectedUsers.map((user, i) => (
                <div
                  onClick={() => {
                    addCoversation(user.username, user.id);
                  }}
                  key={i}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    height: 50,
                  }}
                  className=" container border border-primary list-group-item list-group-item-action d-flex align-items-center"
                >
                  <Avatar
                    src={`https://ui-avatars.com/api/name=${
                      user?.username || "U"
                    }&background=${randomColor}&color=FFFFFF&bold=true`}
                    size={35}
                  >
                    <b> {utils.getNameInitial(user?.username || "No")} </b>{" "}
                  </Avatar>
                  <div style={{ marginLeft: "10px" }}>
                    <h5 style={{ margin: "auto" }}>{user?.username}</h5>
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </Col>
    </>
  );
};

export default Online;
