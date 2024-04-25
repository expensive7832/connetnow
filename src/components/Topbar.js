import React, { useState } from 'react'
import Person from "@material-ui/icons/People";
import Chat from "@material-ui/icons/Chat.js";
import WhatshotIcon from "@material-ui/icons/Whatshot";


import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@material-ui/core'

function Topbar() {
    
    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))


    const [selectTab, setSelectTab] = useState(1);

    const handleTabSelect = (event, i) => {
      setSelectTab(i);
    };

  return (
    <div className="topbar">
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
              TabIndicatorProps={{
                style:{
                  width:"3rem",
                  height:"3rem",
                  borderRadius:"50%"
                }
              }}
            >
              <Tab style={{ color: "#fff" }} icon={<Person />} />
              <Tab style={{ color: "#fff" }} icon={<WhatshotIcon />} />
              <Tab style={{ color: "#fff" }} icon={<Chat />} />
            </Tabs>
          </Box>
    </div>
  )
}

export default Topbar