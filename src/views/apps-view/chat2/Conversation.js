import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Form, Input, Select, Button, Avatar } from "antd";

import utils from "utils";
import userEvent from "@testing-library/user-event";
const Conversation = (props) => {
  const {
    randomColor,
    conversation,
    active,
    selectUser,
    currentUser,
    refreshKey,
    loading,
  } = props;

  console.log(conversation);
  useEffect(() => {
    console.log("rerender");
  }, [refreshKey, loading]);
  return (
    <>
      <Col xs={5} sm={5} md={5} lg={5} className="border border-primary">
        <div className="container">
          <h2 className="">Conversations</h2>
        </div>
        <div className="list-group">
          {conversation ? (
            <>
              {conversation.map((conversation, i) => {
                // Exclude the currentUser from the participants
                const participants = conversation.participants.filter(
                  (participant) => participant.uid !== currentUser.uid
                );
                return (
                  <div
                    key={i}
                    onClick={() =>
                      selectUser(participants[0]?.uid, conversation?._id)
                    }
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      height: 50,
                    }}
                    className={`${
                      active === participants[0]?.uid
                        ? `coversation-active`
                        : ""
                    } container border border-primary list-group-item list-group-item-action d-flex align-items-center`}
                  >
                    <Avatar
                      src={`https://ui-avatars.com/api/name=${participants[0]?.username}&background=${randomColor}&color=FFFFFF&bold=true`}
                      size={35}
                    >
                      <b>
                        {" "}
                        {utils.getNameInitial(
                          participants[0]?.username || "U"
                        )}{" "}
                      </b>
                    </Avatar>
                    <div style={{ marginLeft: "10px" }}>
                      <h5 style={{ margin: "auto" }}>
                        {participants[0]?.username}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>
      </Col>
    </>
  );
};
export default React.memo(Conversation, (prevProps, nextProps) => {
  return prevProps.loading === nextProps.loading;
});
