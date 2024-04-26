import React, { useState, useEffect, useCallback } from "react";
import "./home.css";
import Grid from "@mui/material/Grid";

import Person from "@mui/icons-material/People";
import Chat from "@mui/icons-material/Chat.js";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import {
  Box,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";



import MatchCard from "../components/MatchCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TotalLikes, userInfo } from "../store/Slices/UserSlices";

import { toast } from "react-toastify";

import Profile from "../components/Profile";
import ChatTab from "../components/ChatTab";
import NoMoreProfile from "../components/NoMoreProfile";
import { ArrowBackIos } from "@mui/icons-material";




const Home = ({onlineUsers}) => {



  const [userData, setUserData] = useState(null);

  const theme = useTheme();

  const token = useSelector(({ user }) => user?.token);

  const id = useSelector(({ user }) => user?.data?._id);

  const likesTotal = useSelector((state) => state?.user?.likes);

  const [selectTab, setSelectTab] = useState(1);

  const handleTabSelect = (event, i) => {
    setSelectTab(i);
  };

  const [friendList, setFriendList] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fetchUser = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFriendList(res.data.friends);
        dispatch(userInfo(res.data));
      })
      .catch((err) => {
        navigate("/login");
      });
  }, []);

  const showUserByProximity = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/showuserbyproximity`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(TotalLikes(res?.data?.length));
        setUserData(res.data);
      })
      .catch((err) => {
        for (let key in err.response.data) {
          toast.error(err.response.data[key]);
        }
      });
  }, []);

  useEffect(() => fetchUser(), []);
  useEffect(() => showUserByProximity(), []);

  return (
    <div id="Home">
      <Grid
        className="topBar"
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid xs={0} md={3} item />

        <Grid xs={12} md={6} item>
          <Box
            style={{
              backgroundColor: "#FF5345",
              height: "20vh",
              padding: "0.4rem 0",
              //   display: `${selectTab !== 1 ? "none" : "block"}`,
            }}
          >
            <button
              onClick={() => setSelectTab((prev) => prev - 1)}
              style={{
                textAlign: "left",
                margin: "0 0.6rem",
                color: "#fff",
                display: "block",
                backgroundColor: "transparent",
              }}
            >
              <ArrowBackIos />
            </button>
            <Tabs
            TabIndicatorProps={{
              sx:{
                backgroundColor:"transparent"
              }
            }}
            sx={{
              "& button:focus": {
                backgroundColor:"#f2f3f4"
               
              },
              
            }}
              className="tabs"
              value={selectTab}
              onChange={handleTabSelect}
              aria-label="icon menu"
              textColor="inherit"
              variant="fullWidth"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Tab style={{ color: "#fff" }} icon={<Person />} />
              <Tab style={{ color: "#fff" }} icon={<WhatshotIcon />} />
              <Tab style={{ color: "#fff" }} icon={<Chat />} />
            </Tabs>
          </Box>

          {selectTab === 1 && (
            <div className="tinder-card">
              {!userData ? (
                <Box sx={{ position:"absolute", top: "50%", left:"50%", transform: "translate(-50%)" }}>
                  <img src="./../../loader.gif" style={{ width: "2rem", height: "2rem" }} />
                </Box>
              ) : (
                <>
                  <div className="profilecard">
                    <div className="cardcontainer">
                      {likesTotal == 0 ? (
                        <NoMoreProfile />
                      ) : (
                        userData?.map((each, i) => (
                          <>{<MatchCard data={each} key={each?.id} />}</>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {selectTab === 2 && (
            <div className="chat">
              <ChatTab onlineUsers={onlineUsers} friendList={friendList} />
            </div>
          )}

          {selectTab === 0 && <Profile tab={setSelectTab} />}
        </Grid>

        <Grid xs={0} md={3} item />
      </Grid>
    </div>
  );
};

export default Home;
