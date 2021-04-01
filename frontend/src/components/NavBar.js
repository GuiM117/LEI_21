import React from 'react'
import logo from '../assets/images/logo.png'
import '../styles/NavBar.css'



const navBar = () => {
    return (
        <div className="navBar">
            <div>
                <img className="logoIMG" src={logo} alt={"logo"}></img>
            </div>
            <a className="suport" href="url">Suporte</a>
            <button className="login">
                Login
            </button>
        </div>
    )
}

export default navBar