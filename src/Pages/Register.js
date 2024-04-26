import { PhotoCamera } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.css";

function Register() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          axios(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18`
          )
            .then(({ data }) => {
              const info = {
                code: data?.address?.country_code,
                area: data?.address?.county,
                state: data?.address?.state,
                lon: data?.lon,
                lat: data?.lat,
              };

              setLocation(info);
            })
            .catch((err) => {
              alert(err.message);
            });
        },
        (error) => {
          alert(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 30000,
        }
      );
    } else {
      // alert("please enable location");
    }
  }, []);

  useLayoutEffect(() => getLocation(), []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (location === null) {
      alert("location error");

      setLoading(false);
    } else {
      const data = new FormData(e.currentTarget);
      data.append("location", JSON.stringify(location));

      await axios
        .post(`${process.env.REACT_APP_API_URL}/register`, data)
        .then(({ data }) => {
          setLoading(false);
          toast.success("account created successfully");
          navigate("/login");
        })
        .catch((err) => {
          for (const key in err.response.data) {
            toast.error(err.response.data[key]);
          }

          setLoading(false);
        });
    }
  };

  return (
    <div id="register">
      <Grid container>
        <Grid className="bg" item xs={0} sm={6} />
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 1rem",
            }}
          >
            <div>
              {/* progress */}
              <Box sx={{ width: "100%", marginY: "1rem" }}>
                <Typography
                  component="p"
                  variant="h5"
                  style={{ padding: "2rem" }}
                >
                  Sign up
                </Typography>
              </Box>

              <CardContent>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="fname"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lname"
                        label="Last Name"
                        name="lname"
                        autoComplete="family-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        type="date"
                        id="age"
                        helperText="dob"
                        name="age"
                        autoComplete="date of birth"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="photo"
                        required
                        type="file"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhotoCamera />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl>
                        <FormLabel id="gender">Gender </FormLabel>
                        <Box sx={{ display: "flex", gap: "1rem" }}>
                          <input type="radio" name="gender" value={"male"} />{" "}
                          Male
                          <input
                            type="radio"
                            name="gender"
                            value={"female"}
                          />{" "}
                          female
                          <input type="radio" name="gender" value={"other"} />
                          Other
                        </Box>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl>
                        <FormLabel>Interested In</FormLabel>

                        <Box sx={{ display: "flex", gap: "1rem" }}>
                          <input type="radio" name="interest" value={"male"} />{" "}
                          Male
                          <input
                            type="radio"
                            name="interest"
                            value={"female"}
                          />{" "}
                          female
                          <input type="radio" name="interest" value={"other"} />
                          Other
                        </Box>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="about"
                        label="About Me"
                        multiline
                        maxRows={10}
                        fullWidth
                        name="about"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="confirmpassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmpassword"
                        autoComplete="confirmpassword"
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ height: "15vh" }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ bgcolor: "#000" }}
                    >
                      {loading ? <CircularProgress /> : "Sign up"}
                    </Button>
                    <Grid item>
                      <Link to="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Register;
