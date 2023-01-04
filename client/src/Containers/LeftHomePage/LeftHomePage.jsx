import React from 'react'
import arrow from "../../imgs/arrow.png"
import "./LeftHomePage.css"

function LeftHomePage() {
  return (
    <div className="LeftHomePage-container">
      <h2>Check out your Inner SHAZAM</h2>
      <p>
        Do you think you have what it takes 
        to be the 
        <br />
        BEST HUMAN MUSIC DETECTOR
        <br />
        in the WORLD????
        <br />
        Lets put you to the test!</p>
        <div className="get-started">
        <h3>Get started <img src={arrow} alt="arrow" /></h3>
        </div>
    </div>
  )
}

export default LeftHomePage