import React from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import './landing.css'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

function Landing() {
  return (
    <div className="landing " >
      <div className="">
      <Header/>
      </div>
        <Banner/>
      <div className="intro" style={{width: '75%', margin: 'auto', color: '#000'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ad cum eveniet! 
          Harum aliquid expedita nemo temporibus quos, dolor eos totam atque
           ex fugiat voluptas reprehenderit architecto perspiciatis suscipit sint.
          
          <Grid container justifyContent="space-between" >
            <Grid item>
               <IconButton className='first'>
                <Button variant="outlined" style={{color: "grey"}} size="medium">Personaalise my choices</Button>
               </IconButton>
            </Grid>
           <Grid>
           <Grid container>
           <Grid item>
               <IconButton className='second'>
                <Button variant="outlined" style={{color: "grey"}} size="medium">accept</Button>
               </IconButton>
            </Grid>
            <Grid item>
               <IconButton className='third'>
                <Button variant="outlined" style={{color: "grey"}} size="medium">I decline</Button>
               </IconButton>
            </Grid>
           </Grid>
           </Grid>
          </Grid>

        </div>
    </div>
  )
}

export default Landing