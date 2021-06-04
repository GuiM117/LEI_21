import '../../styles/LandPage.css'
import NavBar from '../../components/NavBar'
import Login from '../../components/Login'
import React from "react"
import loginImg from "../../assets/images/loginImg.png"

const LandPage = () => {
  return (
    <div className="App">
        <div className="navBar">
            <NavBar/>
        </div>
        <div className="main">
            <Login/>
            <img className="loginIMG" src={loginImg} alt={"loginImage"}></img>
        </div>
    </div>
  );
}

export default LandPage;
