import React from 'react'
import logo from '../assets/images/logo.png'
import '../styles/NavBar.css'



const navBar = () => {
    return (
        <div className="navBar">
            <div>
                <img className="logoIMG" src={logo} alt={"logo"}></img>
            </div>
            <a className="suport" href="url">About us</a>
        </div>
    )
}

export default navBar