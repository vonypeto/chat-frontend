import React, { useEffect, useState, useRef } from "react";
import { Col } from "antd";
import { Input, Button } from "antd";

const Message = (props) => {
  const {
    messageContainerRef,
    selectedUser,
    handleKeyPress,
    setMessage,
    message,
    messages,
    currentUser,
    sendMessage,
  } = props;
  return (
    <>
      <Col className="border border-primary" xs={14} sm={14} md={14} lg={14}>
        <div className="conversation-container w-100">
          <div className="border border-primary w-100 container">
            <h2>Messages</h2>
          </div>
          <div className="conversation-messages " ref={messageContainerRef}>
            {selectedUser ? (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message-container ${
                    msg.senderId === currentUser.uid ? "right" : "left"
                  }`}
                >
                  <div className="message-content">
                    {/* <div className="message-sender">{msg.username}</div> */}
                    <div className="message-text">{msg.message}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>Select a user to start a conversation</p>
            )}
          </div>

          <div className="conversation-footer">
            <Input
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </div>
      </Col>
    </>
  );
};

export default Message;
