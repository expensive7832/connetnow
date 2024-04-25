import {  Card, CardMedia, Grid, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import "./matchcard.css"
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import io  from 'socket.io-client'
import { updateLikes } from '../store/Slices/UserSlices'

function MatchCard({data}) {


  const navigate = useNavigate()

  // const ioInstance = useCallback(() =>{
  //   let socket = io(process.env.REACT_APP_API_URL)

  //   socket.on("match", (data) =>{
  //    navigate("/match", {
  //     state: data
  //    })
  //   })
  // }, [])

  // useEffect(() => ioInstance(), [] )


  const dispatch = useDispatch()

  const token = useSelector((state) => state.user.token)
  const loginId = useSelector((state) => state.user.data._id)

 




   

    const onSwipe = (direction) => {
        if(direction !== "right"){
         
        }
      }
      
      const onCardLeftScreen = async(userId) => {

        dispatch(updateLikes())

        
        await axios.get(`${process.env.REACT_APP_API_URL}/like?login_id=${loginId}&user_id=${userId}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }).then((res) =>{
          if(res.data == "success"){

          }else{
            navigate("/match",{
              state:{
                a: res?.data?.a,
                b: res?.data?.b,
                user_id:res?.data?.user_id,
              }
            })
          }
        })
        .catch((err) =>{
          // for(let key in err.response.data){
          //   toast.error(err.response.data[key]);
          // }
          navigate("/login")
        })

        

      }

  return (
    <div className="matchcard">
        <TinderCard
         
        className='swipe'
        key={data?._id}
         style={{ borderRadius: "1rem"}}
          onSwipe={onSwipe} 
          onCardLeftScreen={() => onCardLeftScreen(data?._id)} 
          preventSwipe={['up', 'down', "left"]}>
            <Card
           className='profile'
            >
              <CardMedia
              component={"img"}
              alt={data?.fname}
              src={data?.photos[0]?.url}
            style={{
                height: "15rem",
                width: "100%",
                objectFit: "fill"
            }}
              />

              <Grid container justifyContent='space-around' alignItems='center' style={{
                padding: "2rem 0"
              }}>
                <Typography style={{ textTransform: "capitalize", fontWeight: "bold" }} component={"p"}>{data?.fname}</Typography>

                <div style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    border: "1px solid #FF5345",
                    display:"flex",
                    justifyContent: "center",
                    alignItems:"center"
                }}>
                    <Typography component={"small"}>
                      {new Date().getFullYear() - new Date(data?.age).getFullYear()} 
                    </Typography>
                </div>

              </Grid>
            </Card>
        </TinderCard>
    </div>
  )
}

export default MatchCard