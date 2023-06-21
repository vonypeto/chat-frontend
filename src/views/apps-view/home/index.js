import HeaderNav from "components/layout-components/HeaderNav";
import React, { useState, useEffect, useContext } from "react";
import { Layout } from "antd";
import ChatApp from "../chat2";
import io from "socket.io-client"; // Add this
import { auth } from "auth/FirebaseAuth";
import { SocketContext } from "context/SocketIO";

const { Content } = Layout;
const Home = React.memo(() => {
  const socket = useContext(SocketContext);

  const [username, setUsername] = useState(""); // Add this
  const [room, setRoom] = useState(""); // Add this
  return (
    <div>
      <HeaderNav />
      <Layout className="app-container">
        <Layout className="app-layout">
          <div className="app-content layout-top-nav">
            <Content>
              <ChatApp
                username={username} // Add this
                setUsername={setUsername} // Add this
                room={room} // Add this
                setRoom={setRoom} // Add this
                socket={socket} // Add this
              />
            </Content>
          </div>
        </Layout>
      </Layout>
    </div>
  );
});

export default Home;
