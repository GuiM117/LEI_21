import React, {Component} from "react"
import { withSnackbar } from 'notistack';
import '../styles/Login.css'
import {withRouter} from "react-router";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';



const axios = require('axios')

const initialState = {
    formData: {
        email: '',
        password:''
    },
    submitted: false,
}

class Login extends Component {

    state = { ...initialState}

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = () => {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
        this.login()
    }

    login(){
        axios.get(`http://localhost:4800/users/login?email=${this.state.formData.email}&password=${this.state.formData.password}`)
            .then (dados => {
                if (dados["data"]["response"] === true) {
                    this.props.enqueueSnackbar("Login Efectuado com Sucesso", {
                        variant: 'success',
                        vertical: 'bottom',
                        horizontal: 'center',
                    });
                    window.$name = dados.data.id
                    this.props.history.push("/medic/"+dados.data.id)
                }else{
                    this.props.enqueueSnackbar("Password e/ou email incorretos. Tente novamente", {
                        variant: 'error',
                        vertical: 'bottom',
                        horizontal: 'center',
                    });
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        const { formData, submitted } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                className="loginForm"
            >
                <h2 className="loginTitle">Login</h2>
                <h3 className="subTitle">Autentique-se para entrar na aplicação</h3>
                <TextValidator
                    className="input"
                    label="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={formData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['Campo obrigatório', 'email não é válido']}
                />
                <br />
                <TextValidator
                    className="input"
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    value={formData.password}
                    validators={['required']}
                    errorMessages={['Campo obrigatório']}
                />
                <br />
                <Button
                    className="loginB"
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={submitted}
                >
                    {
                        (submitted && 'Processando')
                        || (!submitted && 'Login')
                    }
                </Button>
            </ValidatorForm>
        );
    }
}

export default withSnackbar(withRouter(Login))