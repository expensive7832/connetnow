import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Card,
  CardContent,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  
} from "@material-ui/core";
import { PhotoCamera, TextFields } from "@mui/icons-material";
import Axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Alert, FormControl, FormLabel } from "@mui/material";
import "./register.css";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';



const SignUp = () => {

  const [location, setLocation ] = useState(null)
  const [loading, setLoading] = useState(false)
  

const getLocation = useCallback(() =>{

 if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    axios(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18`)
    .then(({data}) => {
      const info = {
        code: data?.address?.country_code,
        area: data?.address?.county,
        state: data?.address?.state,
        lon: data?.lon,
        lat: data?.lat
      }

      setLocation(info);
    })
    .catch((err) => {
     
      alert(err.message)
    })
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
 }else{
  alert("please enable location")
 }

}, [])


  useLayoutEffect(() => getLocation , [])

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    setLoading(true)

   if(location === null){

      alert("location error")

      setLoading(false)

   }else{
      const data = new FormData(e.currentTarget);
      data.append("location", JSON.stringify(location))

    
      await axios.post(`${process.env.REACT_APP_API_URL}/register`, data)
      .then(({data}) => {
        setLoading(false)
        toast.success("account created successfully")
        navigate("/login")
    })
      .catch((err) => {
        for (const key in err.response.data) {
         toast.error(err.response.data[key])
        }

        setLoading(false)
      });

   }


 

   
  };

  return (
    <div id="register">
     
      <Grid container>
        <Grid item xs={0} sm={3} />
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card>
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
                      <RadioGroup row  name="gender" defaultValue={"male"}>
                        <FormControlLabel control={<Radio size="small" color="#333"/>} value={"male"} label="male"></FormControlLabel>
                        <FormControlLabel control={<Radio size="small" color="#333"/>} value={"female"} label="female"></FormControlLabel>
                        <FormControlLabel control={<Radio size="small" color="#333"/>} value={"other"} label="other"></FormControlLabel>
                      </RadioGroup>
                      </FormControl>
                      
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl>
                     <FormLabel id="interest">Interested In</FormLabel>
                     <RadioGroup row  name="interest" defaultValue={"male"}>
                        <FormControlLabel control={<Radio size="small" color="#333"/>} value={"male"} label="male"></FormControlLabel>
                        <FormControlLabel control={<Radio size="small" color="#333"/>} value={"female"} label="female"></FormControlLabel>
                        <FormControlLabel control={<Radio size="small" color="#333"/>} value={"other"} label="other"></FormControlLabel>
                      </RadioGroup>
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
                    <Button type="submit" variant="contained" sx={{ mt: 5 }}>
                      {loading ? <CircularProgress/> : "Sign up"}
                    </Button>
                    <Grid item>
                      <Link to="/login" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={0} sm={3} />
      </Grid>
    </div>
  );
};

export default SignUp;
