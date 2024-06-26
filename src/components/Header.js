import React from "react";
import "./header.css";
import Logo from "./../assets/tinder-1.svg";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import { CssBaseline, useTheme, useMediaQuery } from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ flexGrow: 1 }} id="header">
      <CssBaseline />
      <AppBar position="relative" style={{ top: "1rem" }}>
        <Toolbar className="toolbar" variant="dense">
          <img className="logo" src={Logo} alt="site-logo" />

          <div className="center">
            <FormControl
              style={{ display: `${isMobile ? "block" : "none"}` }}
              variant="standard"
              sx={{ m: 1, minWidth: "60", color: "#fff" }}
            >
              <InputLabel
                sx={{ color: "#fff" }}
                id="demo-simple-select-standard-label"
              >
                Info
              </InputLabel>
              <Select fullWidth id="demo-simple-select-standard">
                <MenuItem>1</MenuItem>
                <MenuItem>2</MenuItem>
                <MenuItem>3</MenuItem>
              </Select>
            </FormControl>

            <Typography
              style={{ display: `${isMobile ? "block" : "none"}` }}
              variant="body2"
            >
              Fun
            </Typography>
            <Typography
              style={{ display: `${isMobile ? "block" : "none"}` }}
              variant="body2"
            >
              Download
            </Typography>
          </div>

          <div className="right">
            <IconButton>
              <Link to="/login">
                <Button variant="contained" className="login-button">
                  Login
                </Button>
              </Link>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
