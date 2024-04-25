import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent } from "@material-ui/core";
import { Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./login.css"
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from "react-redux";
import { isLogin } from "../store/Slices/UserSlices";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    const data = new FormData(e.currentTarget);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/login`, data)
      .then((res) => {
        setLoading(false)
        dispatch(isLogin(res.data))
        navigate("/")
      })
      .catch((err) => {
       
        for (const key in err.response.data) {
         toast.error(err.response.data[key])
        }

        setLoading(false)
      });
  };

  return (
    <div id="login">
      <Grid container >
        <Grid item xs={1} sm={3} />
        <Grid item xs={10} sm={6}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ height: "15vh" }}
                  >
                    <Button type="submit" variant="contained" sx={{ mt: 5,width: "auto" }}>
                      {loading ? <CircularProgress/> : "Login"}
                    </Button>
                    <Grid item>
                      <Link to="/register" variant="body2">
                        New user? Sign up
                      </Link>
                    </Grid>
                  </Grid>
                </CardContent>
                {/* social media login */}
                <CardActionArea>
                  <Stack direction="row" sx={{ my: 3 }} spacing={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<FacebookIcon />}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      endIcon={<GoogleIcon />}
                    >
                      Login
                    </Button>
                  </Stack>
                </CardActionArea>
              </Card>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1} sm={3} />
      </Grid>
    </div>
  );
};

export default Login;
