import React, {Component} from "react"
import logo from '../assets/images/logo.png'
import '../styles/Login.css'

const initialState = {
    email: '',
    password:''
}

export default class Login extends Component {

    state = { ...initialState}

    setEmail(event){
        this.setState({email: event.target.email})

    }

    setPassword(event){
        this.setState({password: event.target.password})
    }

    login(){

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
                <button className="login2">
                    Login
                </button>

            </div>

        )
    }
}