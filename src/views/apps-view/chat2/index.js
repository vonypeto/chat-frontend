import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "antd";
import Card from "antd/es/card/Card";
import { useNavigate } from "react-router-dom"; // Add this
import { Form, Input, Select, Button, Avatar } from "antd";
import { auth } from "auth/FirebaseAuth";
import axios from "axios";
import utils from "utils";
import Conversation from "./Conversation";
import { useParams } from "react-router-dom";
import Online from "./Online";

const { Option } = Select;
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
let randomColor = colortag[Math.floor(Math.random() * colortag.length)];

const ChatApp = ({ username, setUsername, room, setRoom, socket }) => {
  let history = useNavigate();
  const { chat } = useParams();
  const { currentUser } = auth;
  const [form] = Form.useForm();
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(
    localStorage.getItem("selected")
  );
  const [conversation, setConversation] = useState(
    JSON.parse(localStorage.getItem("current_covo")) || []
  );
  const [connectedUsers, setConnectedUsers] = useState([]);
  const messageContainerRef = useRef(null);

  // const jsonFileString = localStorage.getItem("auth_token");
  //   const user = JSON.parse(jsonFileString);
  //   console.log(jsonFileString);

  const addCoversation = (username, id) => {
    const jsonFileString = localStorage.getItem("auth_token");
    const user = JSON.parse(jsonFileString);
    console.log(user.user);
    if (user.user === id) return;

    // Check if the id already exists in the conversation array
    const isIdExists = conversation.some(
      (item) => item.id === id || user.user === item.id
    );

    if (!isIdExists) {
      // Create a new item object
      const newItem = { username: username, id: id };

      // Create a new array by spreading the existing conversation array and adding the new item
      const newArray = [...conversation, newItem];

      localStorage.setItem("current_covo", JSON.stringify(newArray));
      localStorage.setItem("selected", id);
      console.log(newArray);
      setSelectedUser(id);
      setConversation(newArray);
      history("/app/home/" + id);
    } else {
      console.log(`ID ${id} already exists in the conversation.`);
      // Handle the case when the ID already exists
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };
  useEffect(() => {
    if (messageContainerRef.current) {
      // Scroll to the bottom of the message container
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      if (socket) {
        socket.on("connect", () => {
          socket.emit("getConnectedUsers");
        });
        socket.emit("getConnectedUsers");
        socket.on("connectedUsers", (users) => {
          console.log(users);
          setConnectedUsers(users);
        });
      }
    }, 500);
    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("connectedUsers");
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Listen for new messages
      socket.on("newMessage", (data) => {
        const { senderId, message, username } = data;
        // Add the new message to the existing messages
        console.log(chat !== senderId);
        console.log(chat, senderId);
        if (chat === senderId) {
          console.log("call");
          setMessages((prevMessages) => [
            ...prevMessages,
            { senderId, message, username },
          ]);
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket]);
  // useEffect(() => {
  //   // Fetch the list of connected users when the chat app boots up
  //   setTimeout(() => {
  //     if (socket) {
  //       socket.emit("getConnectedUsers", (userList) => {
  //         setUsers(userList);
  //       });
  //     }
  //   }, 500);
  // }, []);
  //   useEffect(() => {
  //     // Load previous messages when the app loads
  //     axios
  //       .get("/api/messages")
  //       .then((response) => {
  //         setMessages(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     // Load list of users when the app loads
  //     axios
  //       .get("/api/users")
  //       .then((response) => {
  //         setUsers(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     // Listen for new messages
  //     socket.on("messageReceived", (newMessage) => {
  //       setMessages((prevMessages) => [...prevMessages, newMessage]);
  //     });

  //     // Listen for updated user list
  //     socket.on("userList", (updatedUsers) => {
  //       setUsers(updatedUsers);
  //     });

  //     // Clean up socket connection on unmount
  //     return () => {
  //       socket.off("messageReceived");
  //       socket.off("userList");
  //     };
  //   }, []);

  // Function to handle sending a new message
  const sendMessage = () => {
    if (socket) {
      console.log(message);
      if (!message.length) return;
      const data = {
        recipientId: selectedUser, // Replace with the actual recipient's ID
        message: message,
        username: currentUser?.displayName, // Replace with the actual message content
      };

      socket.emit("sendMessage", data);

      // Clear the input field after sending the message
      setMessage("");

      // Update the messages state with the new message, setting the senderId to the current user
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderId: currentUser.uid,
          message: message,
          username: currentUser?.displayName,
        },
      ]);
    }
  };

  // Function to handle selecting a user for conversation
  const selectUser = (selectedUserId) => {
    const selectedUser = users.find((user) => user._id === selectedUserId);
    setSelectedUser(selectedUser);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (socket) {
  //       // Get the initial list of connected users
  //       socket.on("userList", (userList) => {
  //         setUsers(userList);
  //       });
  //     }
  //   }, 500);
  //   // Clean up the event listener on unmount
  //   return () => {
  //     if (socket) {
  //       socket.off("userList");
  //     }
  //   };
  // }, []);
  const selectUserData = (selectedUserId) => {
    setSelectedUser(selectedUserId);
    localStorage.setItem("selected", selectedUserId);
    history("/app/home/" + selectedUserId);
  };
  return (
    <div>
      <Row justify="center">
        <Col sm={15} md={15} lg={15} xl={20} className="w-100">
          <Card className="w-100">
            <Row>
              <Conversation
                conversation={conversation}
                randomColor={randomColor}
                active={selectedUser}
                selectUser={selectUserData}
              />

              <Col
                className="border border-primary"
                xs={14}
                sm={14}
                md={14}
                lg={14}
              >
                <div className="conversation-container w-100">
                  <div className="border border-primary w-100 container">
                    <h2>Messages</h2>
                  </div>
                  <div
                    className="conversation-messages "
                    ref={messageContainerRef}
                  >
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
              <Online
                connectedUsers={connectedUsers}
                randomColor={randomColor}
                addCoversation={addCoversation}
              />
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChatApp;
