import React from 'react'
import './banner.css'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"
const Banner = () => {
  return (
   
      <div id='banner'>
       <div className='content'>
        
            <h2 className='swipeup'>Swipe Right<small><sup>&reg;</sup></small></h2>
            <IconButton className='reg'>
                <Link to='/register'> <Button variant="contained" size="large" style={{backgroundColor: "#FF5345", color: "#fff"}}>Create Account</Button></Link>
            </IconButton>
       
       </div>
       
    </div>
    
    
  )
}

export default Banner