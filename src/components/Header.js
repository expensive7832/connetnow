import React from "react";
import "./header.css";
import Logo from "./../assets/tinder-1.svg";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import { CssBaseline, useTheme, useMediaQuery } from "@material-ui/core";

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
