import React, { useEffect, useState } from 'react'
import { ArrowBackIos, Person } from '@mui/icons-material';
import Chat from '@mui/icons-material/Chat';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import InputEmoji from "react-input-emoji";
import TelegramIcon from "@mui/icons-material/Telegram";
import heart from "./../assets/heart.gif"


import { Box, Button, Tab,  Tabs, useMediaQuery, useTheme, Grid, CircularProgress, Typography } from "@mui/material"

import "./match.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { AttachFile } from '@mui/icons-material';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Match() {

  const QM = [
    "are you a cat or dog person?",
    "it nice meeting you!",
    "our path ever cross?",
    "are you as cool as your photo depict?",
    "favorite place for holiday?"
  ]

  const [im, setIm] = useState("");

  const [sendStatus, setSendStatus] = useState(false);


  const location = useLocation()

  const [data, setData] = useState(null)

  useEffect(() =>{

    setData(location.state)


  }, [])

    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))


    const [selectTab, setSelectTab] = useState(1);

    const handleTabSelect = (event, i) => {
      setSelectTab(i);
    };

    const navigate = useNavigate()
   
  const loginUser = useSelector((state) => state.user.data);
  const token = useSelector((state) => state.user.token);


    const sendMessage = async (e) => {
      e.preventDefault();
  
      let form = new FormData(e.currentTarget);
  
      form.append("message", im);
      form.append("uid", data.user_id);
      form.append("loginid", loginUser._id);
  
     
  
      if (im === "") return;
  
      setSendStatus(true);
  
      await axios
        .post(`${process.env.REACT_APP_API_URL}/message`, form, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setSendStatus(false)
          navigate("/")
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
    <div className="match">

        <Grid container>
        <Grid item xs={0} md={3} />

        <Grid item xs={12} md={6}>

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
                border:"none",
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

          {/* the card for the match */}

          <div className="match-card">

            <div>
              <img src={data?.a} alt="" />
              <img className='heart' src={heart} alt="" />
              <img src={data?.b} alt="" />
            </div>


          </div>

          {/* quick messages */}

         <Box className='qm'>
         {
            QM?.map((each, i) =>(
             <Typography onClick={() => setIm(each)} className='quicktext' key={i}>{each}</Typography> 
            ))
          }
         </Box>


          <form onSubmit={sendMessage} className="sendBox">
          <InputEmoji
            value={im}
            placeholder="Type a message"
            onChange={(e) => setIm(e)}
          />

          <input type="file" name='images' hidden/>

          {sendStatus ? (
            <CircularProgress />
          ) : (
            <Button className="send" type="submit">
              <TelegramIcon color="#fff" />
            </Button>
          )}
        </form>

        </Grid>

        <Grid item xs={0} md={3} />
        </Grid>

    </div>
  )
}

export default Match