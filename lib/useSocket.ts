"use client";

import { useState, useEffect } from "react";
import { io, type Socket } from "socket.io-client";

// Custom hook for initializing and managing a socket.
// Ported from src/components/useSocket.jsx — same behavior (one connection per
// hostbase value, disconnect on unmount / hostbase change), now typed.
const useSocket = (hostbase: string): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("Initializing socket...");
    const newSocket = io(hostbase);

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
