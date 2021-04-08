import '../styles/App.css'
import NavBar from '../components/NavBar'
import Login from '../components/Login'
import React from "react"
import loginImg from "../assets/images/loginImg.png"

const App = () => {
  return (
    <div className="App">
        <div className="nabBar">
            <NavBar/>
        </div>
        <div className="main">
            <Login/>
            <img className="loginIMG" src={loginImg} alt={"loginImage"}></img>
        </div>
    </div>
  );
}

export default App;
