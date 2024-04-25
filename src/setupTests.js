<ProfileCard
    
// onSwipe={() => onSwipe(user?._id, loginUser?._id)}
// onCardLeftScreen={() => onCardLeftScreen("fooBar")}
preventSwipe={["right", "left"]}
>

<Grid
  container
  justifyContent="space-between"
  alignItems="center"
>

  <div className="tinder-card-inner">
  <Card>
   {
     !user?.photo ?  <Avatar/> :
     <CardMedia
     component="img"
     height="194"
     style={{width:"100%"}}
     src={user?.photo}
     />
   }
    <CardContent className="">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>{user?.fname}</Grid>
        {user?.age &&
        <Grid item xs={6}><em style={{backgroundColor: "red", borderRadius: "50%", maxWidth: "1.2rem", padding: "10px", color: "#fff", fontWeight: "bold"}}>{user?.age}</em>yrs</Grid>
        }
   
      </Grid>
      <section className="tinder-hobby">
      {/* {user?.hobbies?.map((hb) =>{
        return(
          <Typography variant="body2">{hb}</Typography>
        )
      })} */}
 
 
      </section>
      <Typography variant="body" className="aboutMe">
        {user?.about}
      </Typography>
    </CardContent>
  </Card>
    
  </div>

</Grid>
</ProfileCard> 