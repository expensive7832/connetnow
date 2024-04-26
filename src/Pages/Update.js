import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
import { Card, CardContent, CircularProgress, InputLabel } from "@mui/material";
import { TextFields, Token } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FormLabel, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import { useParams } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useDispatch, useSelector } from "react-redux";
import "./update.css"
import { userInfo } from "../store/Slices/UserSlices";


const Update = () => {

    const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
//   user data on page load
  const [data, setData] = useState(null);

  const dispatch = useDispatch() 

  const { id } = useParams();

  const token = useSelector((state) => state?.user?.token)


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/user`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        setData(res?.data);
    })
    .catch((err) => {
        for(let key in err.response.data){
            toast.error(err.response.data[key])
        }

        navigate("/login")
    });
  }, [id]);

  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault();

    const form = new FormData(e.currentTarget)


    form.append("oldfname", data?.fname);
    form.append("oldlname",data?.lname);
    form.append("oldage", data?.age);
    form.append("oldabout", data?.about);
    await axios.patch(`${process.env.REACT_APP_API_URL}/update/${id}`,form)
    .then((res) => {
        setLoading(false)
       dispatch(userInfo(res.data))
       navigate("/")
    })
    .catch((e) => {
        for(let key in e.response.data){
            toast.error(e.response.data[key])
        }
        setLoading(false)
    });
  };

  const [changePasswordView, setChangePasswordView] = useState(false);
  

  return (
    <div id="updateuser">
      <Grid container>
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
            <Card>
              <CardContent>
                <Typography component="h1" variant="h5">
                  Update User
                </Typography>
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
                        placeholder={data?.fname}
                        autoFocus
                        
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        placeholder={data?.lname}
                        name="lname"
                        autoComplete="family-name"
                        
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                      
                        fullWidth
                        type="date"
                        id="age"
                        placeholder={data?.age}
                        name="age"
                        autoComplete="date of birth"
                        
                      />
                    </Grid>

                 
                    
                    <Grid item xs={12}>
                      <TextField
                        id="about"
                        multiline
                        maxRows={6}
                        fullWidth
                        name="about"
                        variant="outlined"
                        placeholder={`${data?.about.slice(0,10)}...`}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ height: "15vh" }}
                  >
                    {loading ? 
                    <CircularProgress/>

                    :

                    <Button type="submit" variant="contained" sx={{ mt: 5 }}>
                      Update
                    </Button>
                    }
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={1} sm={3} />
      </Grid>
    </div>
  );
};

export default Update;
