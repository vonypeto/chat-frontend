import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "auth/FirebaseAuth";
import axios from "axios";
import Conversation from "./Conversation";
import Online from "./Online";
import Message from "./Message";
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
  const navigate = useNavigate();
  const { chat } = useParams();
  const { currentUser } = auth;
  const messageContainerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [conversationRoom, setConversationRoom] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedUser, setSelectedUser] = useState(
    localStorage.getItem("selected")
  );
  const [conversation, setConversation] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);

  const addConversation = (username, id) => {
    const jsonFileString = localStorage.getItem("auth_token");
    const user = JSON.parse(jsonFileString);
    const newArray = [...conversation];
    const newParticipant = {
      username: username,
      uid: id,
      account_id: null,
    };
    if (user.user === id) return;

    const participantExists = newArray.some((conversation) =>
      conversation.participants.some(
        (participant) => participant?.uid === newParticipant?.uid
      )
    );

    if (participantExists) {
      return;
    }

    newArray.push({ participants: [newParticipant] });
    localStorage.setItem("current_covo", JSON.stringify(newArray));
    localStorage.setItem("selected", id);

    setSelectedUser(id);
    setConversation(newArray);
    navigate(`/app/home/${id}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const getConversation = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/get_messages/${currentUser.uid}`);
      setConversation(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversation();
  }, [refreshKey]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (socket) {
        socket.on("connect", () => {
          socket.emit("getConnectedUsers");
        });
        socket.emit("getConnectedUsers");
        socket.on("connectedUsers", (users) => {
          setConnectedUsers(users);
          setLoading(false);
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
    setLoading(true);

    if (socket) {
      socket.on("newMessage", handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [socket, conversation, refreshKey]);

  const handleNewMessage = (data) => {
    getConversation();
    setRefreshKey((prevKey) => prevKey + 1);

    const { senderId, message, username } = data;

    if (chat === senderId) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId, message, username },
      ]);
    }
  };

  const sendMessage = () => {
    setLoading(true);

    if (socket) {
      if (!message.length) return;
      const data = {
        recipientId: selectedUser,
        message: message,
        username: currentUser?.displayName,
        senderId: currentUser.uid,
        conversation_id: conversationRoom,
      };

      socket.emit("sendMessage", data);

      try {
        axios.post("/api/send_message", data).then((res) => {
          setConversationRoom(res.data.id);
        });
      } catch (error) {
        console.log(error.message);
      }

      setMessage("");
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderId: currentUser.uid,
          message: message,
          username: currentUser?.displayName,
          recipientId: selectedUser,
        },
      ]);
    }

    setLoading(false);
  };

  const selectUser = (selectedUserId) => {
    const selectedUser = users.find((user) => user._id === selectedUserId);
    setSelectedUser(selectedUser);
  };

  const selectUserData = (selectedUserId, convo_id) => {
    setLoading(true);

    setSelectedUser(selectedUserId);
    localStorage.setItem("selected", selectedUserId);
    setConversationRoom(convo_id);

    axios
      .post("/api/get_messages_data", { conversation_id: convo_id })
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      });

    navigate(`/app/home/${selectedUserId}`);
  };

  return (
    <div>
      <Row justify="center">
        <Col sm={15} md={15} lg={15} xl={20} className="w-100">
          <Card className="w-100">
            <Row>
              <Conversation
                conversation={conversation}
                active={selectedUser}
                selectUser={selectUserData}
                currentUser={currentUser}
                refreshKey={refreshKey}
                getConversation={getConversation}
                loading={loading}
                randomColor={randomColor}
              />
              <Message
                messageContainerRef={messageContainerRef}
                selectedUser={selectedUser}
                handleKeyPress={handleKeyPress}
                setMessage={setMessage}
                message={message}
                messages={messages}
                currentUser={currentUser}
                sendMessage={sendMessage}
              />
              <Online
                connectedUsers={connectedUsers}
                addCoversation={addConversation}
                loading={loading}
                randomColor={randomColor}
              />
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChatApp;
