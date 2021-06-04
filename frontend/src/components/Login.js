import logo from '../assets/images/logo.png'
import '../styles/Login.css'
import React, { useState } from 'react';
import LoginAlerts from './Alerts'
import {withRouter} from "react-router";


const axios = require('axios')

function Login (props){

    const [iState, setState] = useState({
        email: '',
        password:''
    })



    login(){
        axios.get(`http://localhost:4800/users/login?email=${this.state.email}&password=${this.state.password}`)
            .then (dados => {
                if (dados["data"]["response"] === true) {
                    console.log("True")
                    console.log(iState.password)
                    props.history.push('/medic')
                }
                else {
                    console.log("FAIL")
                    return (
                        <LoginAlerts open={true}/>
                    )
                }
            })
            .catch(error => console.log(error))
    }


    return (
            <div>
                <img className="logoIMG" src={logo} alt={"logo"}></img>
                <div className="loginTitle">
                    LOGIN
                </div>
                <div className="subTitle">
                    Autentique-se para entrar na aplicação
                </div>
                <div className="loginForm">
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" value={iState.email} onChange={event => setState({...iState, email: event.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" value={iState.password} onChange={event=> setState({...iState, password: event.target.value})} />
                    </div>
                </div>
                <button className="login2" onClick={event => this.login()}>
                    Login
                </button>

            </div>

        )
}

export default withRouter(Login)