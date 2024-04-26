import React, { useCallback, useEffect, useState } from "react";
import "./chatheader.css";
import {
  ArrowBackIos,
  Cancel,
  MoreHorizRounded,
  ShareSharp,
  VideoCall,
  Videocam,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { Phone } from "@mui/icons-material";

function ChatHeader() {
  const [showProfile, setShowProfile] = useState(false);

  const { id } = useParams();

  const [user, setUser] = useState(null);

  const token = useSelector(({ user }) => user.token);

  const navigate = useNavigate();

  const fetchUser = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        navigate("/login");
      });
  }, []);

  useEffect(() => fetchUser(), []);

  return (
    <>
      <div className="chatheader">
        <Stack direction={"row"} alignItems={"center"} gap={"1rem"}>
          <button onClick={() => navigate(-1)}>
            <ArrowBackIos />
          </button>

          <Stack direction="row" gap="5" alignItems={"center"}>
            <Typography>{user?.fname}</Typography>
            <Avatar className="profile" component={"image"} src={user?.photos[0]?.url} />
          </Stack>
        </Stack>

        <Stack direction={"row"} alignItems={"center"} gap={"2rem"}>
          <button>
            <Phone />
          </button>
          <button>
            <Videocam />
          </button>
          <button onClick={() => setShowProfile(true)}>
            <MoreHorizRounded />
          </button>
        </Stack>
      </div>

      {/* show profile */}

      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "50%",
        }}
      >
        <Dialog
          keepMounted
          hideBackdrop={true}
          open={showProfile}
          onClose={() => setShowProfile(false)}
        >
          <DialogContent>
            <button style={{
                display:"block",
                marginLeft: "auto"
            }} onClick={() => setShowProfile(false)}>
              <Cancel />
            </button>
            <Box
              flexDirection={"row"}
              justifyContent={"center"}
              sx={{
                height: "6rem",
              }}
            >
              <Avatar
                src={user?.photos[0]?.url}
                style={{
                  height: "7rem",
                  objectFit: "contain",
                  margin: "auto",
                  width: "7rem",
                }}
              />
            </Box>

            <Stack direction={"row"} justifyContent={"space-around"} alignItems={"center"} sx={{ my: "1rem"}}>

            <Typography>
              {new Date().getFullYear() - new Date(user?.age).getFullYear() } yrs
            </Typography>
            <Typography sx={{ my: "1rem"}}>
              {user?.gender}
            </Typography>

            </Stack>

            <Stack
            sx={{
                my: "0.5rem"
            }}
              justifyContent={"center"}
              direction={"row"}
              alignItems={"center"}
              gap={"2rem"}
            >
              <button>
                <Phone sx={{height: "3rem"}} />
              </button>
              <button>
                <Videocam  sx={{height: "3rem"}}  />
              </button>
              <button onClick={() => setShowProfile(true)}>
                <ShareSharp  sx={{height: "3rem"}}  />
              </button>
            </Stack>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}

export default ChatHeader;
