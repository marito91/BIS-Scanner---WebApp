import { useState, useEffect } from "react";
import io from "socket.io-client";

// Custom hook for initializing and managing a socket
const useSocket = (hostbase) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("Initializing socket...");
    const newSocket = io.connect(hostbase);

    newSocket.on("connect", () => {
      console.log("Connected to the Socket.io server");
    });

    setSocket(newSocket); // Set the socket once it's connected

    return () => {
      if (newSocket) {
        newSocket.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [hostbase]);

  return socket;
};

export default useSocket;
