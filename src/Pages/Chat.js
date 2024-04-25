import {
  Box,
  Card,
  Button,
  Typography,
  CircularProgress,
  DialogContent,
  Dialog,
  Slide,
} from "@material-ui/core";

import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import ChatHeader from "../components/ChatHeader";
import TelegramIcon from "@mui/icons-material/Telegram";
import { AttachFile } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Chat = ({ socket }) => {
  const [im, setIm] = useState("");

  const [sendStatus, setSendStatus] = useState(false);

  const [showImg, setShowImg] = useState(false);

  const [imgToDisplay, setImgToDisplay] = useState("");

  const [chats, setChats] = useState([]);

  const scrollToEnd = useRef();

  const navigate = useNavigate();

  const [newMessage, setNewMessage] = useState(null);

  const [images, setImages] = useState(null);

  const { id } = useParams();

  const loginUser = useSelector((state) => state.user.data);
  const token = useSelector((state) => state.user.token);

  // socket for sending message
  useEffect(() => {
    if (socket == null) {
      return;
    } else if (newMessage == null) {
      return;
    } else {
      socket.emit("newmessage", newMessage);
    }

    return () => {
      socket.off("newmessage");
    };
  }, [newMessage, socket]);

  // receive message

  useEffect(() => {
    if (socket == null) return;

    socket.on("getmessage", (data) => {
      let checkRoom = chats?.some((ch) => ch.chatId === data.chatId);
      console.log(checkRoom);
      if (checkRoom) {
        setChats((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("getmessage");
    };
  }, [socket, chats]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/fetchexistingmsg/?loginid=${loginUser?._id}&uid=${id}`
      )
      .then((res) => setChats(res?.data))
      .catch((err) => {
        console.log(err);
      });
  }, [loginUser, id, socket]);

  useEffect(() => {
    scrollToEnd.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [chats]);
  const sendMessage = async (e) => {
    e.preventDefault();

    let data = new FormData(e.currentTarget);

    data.append("message", im);
    data.append("uid", id);
    data.append("loginid", loginUser._id);

    let img = data.get("images");

    if (im === "" && img.name === "") return;

    setSendStatus(true);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/message`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setNewMessage(res?.data);
        setChats((prev) => [...prev, res?.data]);
        setIm("");
        setSendStatus(false);
      })
      .catch((e) => {
        // for (let key in e?.response?.data) {
        //   toast.error(e.response.data[key]);
        // }
        console.log(e);
        setSendStatus(false);
        navigate("/login")
      });
  };

  return (
    <div id="chat">
      <Card>
        <ChatHeader />

        <div className="chatarea" ref={scrollToEnd}>
          {chats?.length === 0 ? (
            <p className="nomsg">
              No conversation Yet, send a romantic text now!!!
            </p>
          ) : (
            chats.map((e) => (
              <Box
                key={e._id}
                style={{
                  display: "flex",
                  // flexDirection: `${ e?.senderId._id === loginUser?._id ? " row" : "row-reverse"}`,
                  alignItems: "center",
                  margin: ".2rem 0",
                  justifyContent: `${
                    e?.senderId._id === loginUser._id
                      ? "flex-end"
                      : "flex-start"
                  }`,
                }}
              >
                <Dialog
                  open={showImg}
                  keepMounted
                  transitionDuration={1000}
                  onClose={() => setShowImg(false)}
                  TransitionComponent={Transition}
                  hideBackdrop={true}
                  PaperProps={{
                    style: {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                  }}
                >
                  <DialogContent
                    style={{
                      height: "auto",
                    }}
                  >
                    <img
                      style={{
                        height: "max-content",
                        width: "100vw",
                        objectFit: "contain",
                      }}
                      src={imgToDisplay}
                      alt="full body image"
                    />
                  </DialogContent>
                </Dialog>

                <div
                  className="contentBox"
                  style={{
                    color: `${e?.senderId._id === loginUser?._id && "#fff"}`,
                    backgroundColor: `${
                      e?.senderId._id === loginUser?._id ? "#d7d8d9" : "#fff"
                    }`,
                  }}
                >
                  {e?.photos?.length === 0 && e?.text !== "" ? (
                    <Typography className="text">{e?.text}</Typography>
                  ) : e?.photos?.length === 1 ? (
                    <div>
                      <img
                      className="single"
                        onClick={() => {
                          setImgToDisplay(e?.photos[0]?.url);
                          setShowImg(true);
                        }}
                        src={e?.photos[0]?.url}
                        alt="upload photo"
                      />
                      {e?.text !== "" && (
                        <Typography
                          style={{
                            margin: "3px 0",
                          }}
                          component={"p"}
                        >
                          {e?.text}
                        </Typography>
                      )}
                    </div>
                  ) : (
                    <Box flexDirection={"column"}>
                    <Box className="multi-img">
                      {e?.photos?.map((ph) => (
                        <img
                          onClick={() => {
                            setImgToDisplay(ph?.url);
                            setShowImg(true);
                          }}
                          src={ph?.url}
                          alt="upload photo"
                        />
                      ))}
                    </Box>

                    {e?.text !== "" && (
                        <Typography
                          style={{
                            margin: "3px 0",
                            padding: "0.5rem"
                          }}
                          component={"p"}
                        >
                          {e?.text}
                        </Typography>
                      )}
                  </Box>
                  )}
                </div>
              </Box>
            ))
          )}
        </div>

        <form onSubmit={sendMessage} className="sendBox">
          <InputEmoji
            value={im}
            placeholder="Type a message"
            onChange={(e) => setIm(e)}
          />

          <Box display={"flex"} style={{ gap: "1rem" }}>
            <input name="images" multiple type="file" hidden id="img" />

            <label htmlFor="img">
              <AttachFile />
            </label>
          </Box>

          {sendStatus ? (
            <CircularProgress />
          ) : (
            <Button className="send" type="submit">
              <TelegramIcon color="#fff" />
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Chat;
