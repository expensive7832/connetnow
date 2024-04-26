import React, { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import { io } from "socket.io-client";

const Landing = lazy(() => import("./Pages/Landing"));
const Register = lazy(() => import("./Pages/Register"));
const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));
const Match = lazy(() => import("./Pages/Match"));
const UpdateUser = lazy(() => import("./Pages/Update"));
const Chat = lazy(() => import("./Pages/Chat"));

const App = () => {
  const user = useSelector((state) => state.user.data);

  const [onlineUsers, setOnlineUsers] = useState(null);

  const [lastMsg, setLastMsg] = useState(null);

  const [socket, setSocket] = useState(null);

 let ioInstantiate = useCallback(() =>{

    let socketIo = io(process.env.REACT_APP_API_URL);

    setSocket(socketIo);


  }, [])

  // initialize socket
  useEffect(() => ioInstantiate(), [])

  // join to online user
  useEffect(() => {
    if (socket == null) {
      return;
    } else if (user == null) {
      return;
    } else {
      socket.emit("userconnect", user._id);
    }

    return () => {
      socket.off("userconnect");
    };
  }, [socket, user]);

  //  get online user

  useEffect(() => {
    if (socket == null) return;

    socket.on("online", (data) => {
      setOnlineUsers(data);
    });

    return () => {
      socket.off("online");
    };
  }, [socket]);

  

  const login = useSelector((state) => state.user.login);

  return (
    <div id="tinder">
      <CssBaseline />
      <ToastContainer position="top-center" />
      <Suspense fallback={<div 
      style={{
        position:"absolute",
        top: "50%",
        left:"50%",
        transform: "translate(-50%)"
      }}
      >
        <img style={{
          width: "6rem",
          height:"6rem",
          objectFit:"contain"
        }} src="./../loading.png" alt="loader" />
      </div>}>
        <BrowserRouter>
          <Routes>
            {
              login === true ?
              <Route
              path="/"
              element={<Home onlineUsers={onlineUsers} /> }
            />
            
            :

            <Route
              path="/"
              element={<Landing/> }
            />
            }
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/match" element={<Match />} />
            <Route path="/update/:id" element={<UpdateUser />} />
            <Route path="/chat/:id" element={<Chat socket={socket}   />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
