import React, { useEffect, useState } from 'react'
import Person from "@material-ui/icons/People";
import Chat from "@material-ui/icons/Chat.js";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import InputEmoji from "react-input-emoji";
import TelegramIcon from "@mui/icons-material/Telegram";
import heart from "./../assets/heart.gif"


import { Box, Button, Tab,  Tabs, useMediaQuery, useTheme, Grid, CircularProgress, Typography } from '@material-ui/core'

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
              display: "flex",
              justifyContent:`space-around`,
              alignItems: "center"
            //   display: `${selectTab !== 1 ? "none" : "block"}`,
            }}
          >
            <Tabs
              className="tabs"
              value={selectTab}
              onChange={handleTabSelect}
              aria-label="icon menu"
              textColor="inherit"
              variant="fullWidth"
              
              
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