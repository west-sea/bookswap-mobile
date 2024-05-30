import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { api } from "../store/api";
import { useDispatch } from "react-redux";

const apiSocketUrl = process.env.EXPO_PUBLIC_API_SOCKET_URL;

const SocketContext = React.createContext({
  socket: null,
  init: (token) => null,
});

export function useSocket() {
  const value = React.useContext(SocketContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSocket must be wrapped in a <SocketProvider />");
    }
  }
  return value;
}

export function SocketProvider(props) {
  const [socket, setSocket] = React.useState(null);
  const dispatch = useDispatch();

  const init = (token) => {
    const newSocket = io(apiSocketUrl, {
      autoConnect: true,
      query: {
        token,
      },
    });
    newSocket.on("connect", () => {
      console.log("Socket connected");
    });
    newSocket.on("message", () => {
      dispatch(api.util.invalidateTags(["chats"]));
    });
    newSocket.on("notification", () => {
      dispatch(
        api.util.invalidateTags([
          "notifications",
          "chats",
          "books",
          "exchanges",
        ])
      );
    });
    setSocket(newSocket);
    return newSocket;
  };

  useEffect(() => {
    if (props.token) {
      init(props.token);
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [props.token]);

  return (
    <SocketContext.Provider value={{ socket, init }}>
      {props.children}
    </SocketContext.Provider>
  );
}
