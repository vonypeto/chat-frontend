import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const jsonFileString = localStorage.getItem("auth_token");
    const user = JSON.parse(jsonFileString);
    console.log(jsonFileString);
    if (user) {
      // Connect to Socket.io server
      const newSocket = io.connect("http://localhost:5000", {
        query: {
          id: user?.user,
          username: user?.username,
        },
      });
      newSocket.emit("addUser");

      setSocket(newSocket);
    }

    return () => {
      // Disconnect from Socket.io server
      if (socket) {
        socket.disconnect();
      }
    };
  }, [localStorage.getItem("auth_token")]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
