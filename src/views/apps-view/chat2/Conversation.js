import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Form, Input, Select, Button, Avatar } from "antd";

import utils from "utils";
import userEvent from "@testing-library/user-event";
const Conversation = (props) => {
  const { randomColor, conversation, active, selectUser } = props;
  console.log(conversation);
  return (
    <>
      <Col xs={5} sm={5} md={5} lg={5} className="border border-primary">
        <div className="container ">
          <h2 className="">Conversations</h2>{" "}
        </div>
        <div className="list-group">
          {conversation ? (
            <>
              {conversation.map((conversation, i) => (
                <div
                  onClick={() => selectUser(conversation.id)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    height: 50,
                  }}
                  className={`${
                    active === conversation.id ? `coversation-active` : ""
                  } container border border-primary list-group-item list-group-item-action d-flex align-items-center`}
                >
                  <Avatar
                    src={`https://ui-avatars.com/api/name=${conversation.username}&background=${randomColor}&color=FFFFFF&bold=true`}
                    size={35}
                  >
                    <b> {utils.getNameInitial("null")} </b>{" "}
                  </Avatar>
                  <div style={{ marginLeft: "10px" }}>
                    <h5 style={{ margin: "auto" }}>{conversation.username}</h5>
                  </div>
                </div>
              ))}
            </>
          ) : null}

          {/* <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              height: 50,
            }}
            className=" container border border-primary list-group-item list-group-item-action d-flex align-items-center"
          >
            <Avatar
              src={`https://ui-avatars.com/api/name=${"vonypet"}&background=${randomColor}&color=FFFFFF&bold=true`}
              size={35}
            >
              <b> {utils.getNameInitial("null")} </b>{" "}
            </Avatar>
            <div style={{ marginLeft: "10px" }}>
              <h5 style={{ margin: "auto" }}>Vonypet</h5>
            </div>
          </div> */}
        </div>
      </Col>
    </>
  );
};

export default Conversation;
