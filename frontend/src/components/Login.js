import React, {Component} from "react"
import logo from '../assets/images/logo.png'
import '../styles/Login.css'
import {withRouter} from "react-router";



const axios = require('axios')

const initialState = {
    email: '',
    password:''
}



class Login extends Component {

    state = { ...initialState}

    setEmail(event){
        this.setState({email: event.target.value})

    }

    setPassword(event){
        this.setState({password: event.target.value})
    }

    login(){
        console.log("AQUI antes do axios.get")
        axios.get(`http://localhost:4800/users/login?email=${this.state.email}&password=${this.state.password}`)
            .then (dados => {
                if (dados["data"]["response"] === true) {
                    console.log("True")
                    this.props.history.push('/medic')
                }
                else console.log(("False"))
            })
            .catch(error => console.log(error))
    }


    render() {
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
                        <input type="email" name="email" value={this.state.email} onChange={event => this.setEmail(event)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" value={this.state.password} onChange={event=> this.setPassword(event)} />
                    </div>
                </div>
                <button className="login2" onClick={event => this.login2()}>
                    Login
                </button>

            </div>

        )
    }
}

export default withRouter(Login)