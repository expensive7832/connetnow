import React from 'react'
import "./nomore.css"
function NoMoreProfile() {
  return (
    <div className='nomore'>
        <div className="container">

        <h3>No More Profile</h3>

        <p>You've seen everyone who matches your interest <br />
        refresh or check later to see more people
        </p>

        <button onClick={() => window.location.reload()}>refresh</button>

        </div>
    </div>
  )
}

export default NoMoreProfile