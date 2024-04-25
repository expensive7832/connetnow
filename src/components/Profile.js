import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Input,
  Modal,
  Typography,
} from "@material-ui/core";
import { Container, Stack } from "@mui/material";
import pp from "./../assets/images.jpeg";
import { Cancel, Delete, FileUploadOutlined, PhotoCamera } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import WcIcon from "@mui/icons-material/Wc";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isLogout, userInfo } from "../store/Slices/UserSlices";
import axios from "axios";
import { CameraAlt } from "@material-ui/icons";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
const Profile = ({ tab }) => {

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.data);


  const token = useSelector((state) => state?.user?.token);

  const handleImageSubmit = async (e) => {

    setLoading(true)

    e.preventDefault();
  

    const data = new FormData(e.currentTarget);


    await axios.post(`${process.env.REACT_APP_API_URL}/morepics/`, data,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setLoading(false)
        setModalCtrl(false)
        dispatch(userInfo(res.data))
      })
      .catch((err) => {
    
        if(err?.response?.data?.photos){
          toast.error("maximum of 5 photo!!! delete to upload new")
        }else{
           for (let key in err.response.data) {
          toast.error(err.response.data[key]);
        }
        }
       
      });
      setLoading(false)
      setModalCtrl(false)
  };

  const navigate = useNavigate();

 

  const interest = () => {
    if (user?.interest === "male") {
      return <ManIcon />;
    } else if (user?.interest === "female") {
      return <WcIcon />;
    } else {
      return <WcIcon />;
    }
  };

  const Logout = () => {
    dispatch(isLogout());

    navigate("/login");
  };

  const [modalCtrl, setModalCtrl] = useState(false)
  const [showImage, setshowImage] = useState(false)
  const [imageUrl, setImageUrl] = useState("")


  async function deleteImage(id){
    await axios.delete(`${process.env.REACT_APP_API_URL}/deletepic?id=${id}&userid=${user._id}`)
    .then((res) => {
      dispatch(userInfo(res.data))
    })
    .catch((err) =>{
      for(let key in err.response.data){
        toast.error(err.response.data[key])
      }
    })
    
  }



  return (
    <Container id="profile">
      {user != null ? (
        <Grid container>
          <Grid item xs={0} sm={2} />

          <Grid item xs={12} sm={8}>
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </Button>

              <Button onClick={Logout} style={{ color: "red" }}>
                <LogoutIcon />
              </Button>
            </Stack>

            <div className="ppSection">
              <Avatar className="profImg" src={user?.photos[0]?.url} alt="profile pic" />

            
            </div>

            <Typography
              style={{ fontWeight: "bold", textTransform: "capitalize" }}
              variant="body1"
            >
              {user?.fname}
            </Typography>

            <Divider />

            {/*************info**************** */}
            <Stack
              style={{ margin: "1rem 0" }}
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Typography variant="h6">
                {user?.gender} &nbsp;{" "}
                {new Date().getFullYear() - new Date(user?.age).getFullYear()}
              </Typography>
              {/* <Typography variant="h6">{user?.loc}</Typography> */}
            </Stack>

            {/*************hobby**************** */}

            <Typography className="hobbyTitle" variant="p">
              Hobbies
            </Typography>

            <ul className="hobby">
              {user?.hobbies?.map((hb, i) => {
                return <li key={i}>{hb}</li>;
              })}
            </ul>

            {/*************interest**************** */}
            <Typography gutterBottom className="interest" variant="p">
              Interested In
            </Typography>
            <br />
            <Button
              style={{ margin: ".6rem 0", width:"fit-content"  }}
              color="primary"
              size="small"
              startIcon={interest()}
              variant="outlined"
            >
              {user?.interest}
            </Button>
            <br />

            {/*************About me**************** */}

            <Box flexDirection={"column"} >
              <Typography className="aboutmeTitle" variant="p">About Me</Typography>
              <Box style={{padding: "1rem 0"}}>
              {user?.about !== "" ? user?.about : "Tell us about Yourself"}
              </Box>
            </Box>

            {/* ******** other image ***** */}
            <Box>
              <Typography component={"h2"} style={{margin: "6px 0"}} >Galleries</Typography>
            <Stack alignItems={"center"} justifyContent={"flex-start"} direction={"row"} gap={3} flexWrap={"wrap"}>
             
             {
              user?.photos?.slice(1,)?.map((each) =>(
               <div className="otherpic">
                 <button onClick={() => deleteImage(each?.id)}  className="deleteIcon">
                    <Delete />
                 </button>
                 <div className="theavatar">
                 <Avatar
                
                onClick={() => {
                  setImageUrl(each?.url)
                  setshowImage(true)
                }}
                key={each.id}
                src={each?.url}
                style={{
                  height: "6rem",
                  borderRadius: "15px",
                  width: "5rem",
                  maxWidth: "100%"
                }}
                />
                 </div>
               </div>
              ))
             }

              

              <Box onClick={() => setModalCtrl(true)} style={{
                 height: "5rem",
                 borderRadius: "15px",
                 width: "4rem",
                 maxWidth: "100%",
                 border: "1px solid #d3d3d3",
                 display:"flex",
                 justifyContent:"center",
                 alignItems:"center",
                 cursor: "pointer"

              }}>
                <h4>ADD</h4>

              
              </Box>
              {/* modal  */}
              <Dialog
                keepMounted
                open={modalCtrl}
                onClose={() => setModalCtrl(false)}
                
                >
                  <DialogTitle style={{display:"flex", justifyContent:"flex-end"}}>
                    <Box onClick={() => setModalCtrl(false)}>
                      <Cancel/>
                      </Box>
                    </DialogTitle>
                  <DialogContent>
                   
                    <Box flexDirection={"row"} alignItems={"center"} component={"form"} onSubmit={handleImageSubmit}>
                    <input multiple={true}  type="file" name="images" accept="image/*"  />
                   {
                    loading ?
                    <CircularProgress/>
                    :

                    <Button type="submit" variant="outlined" color="#333">
                    <FileUploadOutlined/>
                  </Button>
                   }
                    </Box>
                  </DialogContent>

              
                </Dialog>

              {/* end of modal */}


              {/* modal to display image in big form */}

              <div className="showimg">
              <Dialog
               open={showImage}
              onClose={() => setshowImage(false)}
              PaperProps={{
                style: {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                },
              }}
              >
                <DialogContent>
                  <Avatar

                  style={{
                    minHeight: "20rem",
                    minWidth: "20rem",
                  }}
                
                  src={imageUrl}
                  alt="user image"
                  />
                </DialogContent>
              </Dialog>
              </div>
              
            </Stack>

            </Box>

            <Divider style={{margin: "1rem 0"}}/>

            {/*************bottom button**************** */}

            <Stack
              style={{ margin: "1rem 0" }}
              direction="row"
              justifyContent="start"
              spacing={3}
            >
              <Link to={`/update/${user?._id}`}>
                <Button
                  style={{width:"fit-content"}}
                  color="primary"
                  startIcon={<UpdateIcon />}
                  variant="outlined"
                >
                  Update
                </Button>
              </Link>

              <Link to={`/delete/${user?._id}`}>
                <Button
                
                  color="error"
                  endIcon={<DeleteIcon />}
                  style={{ color: "red", width:"fit-content" }}
                  variant="outlined"
                >
                  Delete
                </Button>
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={0} sm={2} />
        </Grid>
      ) : (
        <>
          <Typography>Login To Access This Page</Typography>
          <Link to="/login">
            <Button variant="contained" color="secondary">
              Login!
            </Button>
          </Link>
        </>
      )}
    </Container>
  );
};

export default Profile;
