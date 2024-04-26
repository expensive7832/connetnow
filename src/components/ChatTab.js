import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Skeleton, Stack } from "@mui/material";
import "./chatTab.css";
import { Link } from "react-router-dom";

import axios from "axios";
import { useSelector } from "react-redux";
import Moment from "react-moment";

const ChatTab = ({ friendList, onlineUsers }) => {
  
  const xs = useMediaQuery("(max-width: 576px)");

  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.data._id);
  const [prevChats, setPrevChat] = useState(null);

  const fetchPrevChats = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/fetchchats/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setPrevChat(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => fetchPrevChats(), []);

  

  return (
    <div id="chatTab">
      {friendList?.length > 0 ? (
        <>
          <Stack
            className="friendDisplay "
            direction={"row"}
            gap={"0.5rem"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {friendList?.map((fL, i) => (
              <a href={`/chat/${fL?._id}`} key={i}>
                <Container
                  style={{
                    position: "relative",
                  }}
                >
                  <img
                    style={{
                      height: "7rem",
                      width: "7rem",
                      objectFit: "cover",
                    }}
                    src={fL?.photos[0]?.url}
                    alt=""
                  />

                  {
                  onlineUsers?.some((each) => each.uid === fL._id) ?
                  
                  <small
                  style={{
                    position: "absolute",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "rgb(0,255,0)",
                    top: 0,
                    right: "1rem",
                  }}
                ></small>

                :

                <small
                style={{
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "gray",
                  top: 0,
                  right: "1rem",
                }}
              ></small>
                   
                  }
                </Container>
              </a>
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Box>
            <Typography variant="body">Swipe And Make A Friend</Typography>
          </Box>
        </>
      )}

      {/* prev chats */}

      <Box>
        {prevChats === null ? (
          <>
            <Skeleton width={"50%"} height={100} />
            <Skeleton width={"50%"} height={100} />
            <Skeleton width={"50%"} height={100} />
          </>
        ) : (
          prevChats?.map((pc) => (
            <a
              href={`/chat/${
                id === pc?.docs?.senderId
                  ? pc?.docs?.receiverId
                  : pc?.docs?.senderId
              }`}
            >
              <Stack
                direction={"row"}
                sx={{
                  bgcolor: "#f2f2f3",
                  p: "0.6rem",
                  m: `${xs ? "2px auto" : "2px 0"}`,
                  width: "80%",
                }}
                alignItems={"center"}
                gap={10}
              >
                <Avatar
                  src={
                    id == pc?.docs?.senderId
                      ? pc?.docs?.receiver[0]?.photos[0]?.url
                      : pc?.docs?.sender[0]?.photos[0]?.url
                  }
                />
                <Typography component={"em"}>
                  {pc?.docs?.text?.length > 10
                    ? `${pc?.docs?.text?.slice(0, 11)}...`
                    : `${pc?.docs?.text}...`}
                </Typography>

                <div>
                  <i>
                    <Moment fromNow>{pc?.docs?.createdAt}</Moment>
                  </i>
                </div>
              </Stack>
            </a>
          ))
        )}
      </Box>
    </div>
  );
};

export default ChatTab;
