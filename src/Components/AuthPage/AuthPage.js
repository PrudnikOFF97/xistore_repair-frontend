import React, { Component } from 'react';
import Axios from 'axios';
import Card from '@material-ui/core/Card';
import './AuthPage.css'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { AuthContext } from '../../Context/auth-context'




class AuthPage extends Component {
    static contextType = AuthContext;
    constructor(){
        super();
        this.state = {
            login: "",
            password: "",
            errors: {
                login: ' ',
                password: ' '
            },
            message: ""
        };
    }
    SubmitHandler = (event) => {
        this.setState(pre => ({
            isloading: true
        }))
        const auth = this.context
        event.preventDefault();

        if (this.state.isLoginMode) {

        }
        else {
            this.setState(pre => ({
                isloading: true
            }))
        }
        this.setState({
            user: { ...this.state.user, email: '', password: '' }
        });
    }
    LoginHandler = () => {
        const auth = this.context;
        Axios.post(process.env.REACT_APP_API_URL+'/user/login', {login: this.state.login, password: this.state.password})
        .then(response => {
            this.props.history.push('/');
            auth.login(response.data.userId, response.data.token);
        }).catch(e => {});
    };
    SignUpHandler = () => {
        const user = {login: this.state.login, password: this.state.password};
        Axios.post(process.env.REACT_APP_API_URL+'/user/signup', user).then(response => {
            response.status == 201 ? this.setState({message: "Вы успешно зарегистрированы!"}) : this.setState({message: ""});
        })
    };
    ChangeHandler = (event) =>{
        let errors = this.state.errors;
        this.setState({[event.target.name]: event.target.value});
        switch (event.target.name) {

            case 'login':
                if (event.target.value.length > 0) {
                    errors.login = event.target.value.length < 5 ? 'Логин обязателен!' : '';
                }
                if (event.target.value.length === 0) {
                    errors.login = event.target.value.length === 0 ? 'Логин обязателен!' : '';
                    break;
                }
                break;
            case 'password':
                if (event.target.value.length > 0) {
                    errors.password = event.target.value.length < 6 ? 'Пароль должен содержать как минимум 6 символов!' : '';
                }

                if (event.target.value.length === 0) {
                    errors.password = event.target.value.length === 0 ? 'Пароль обязателен!' : '';
                }
                break;
            default:
                break;
        }
        this.setState({errors: errors});
        // console.log(`${event.target.login} : ${this.state[event.target.login]}`);
    }
    CssTextField = withStyles({
        root: {
          '& label.Mui-focused': {
            color: '#FF6700',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#FF6700',
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#FF6700',
            },
          },
        },
      })(TextField);


    render() {
        let {login, password} = this.state;
        return (
            <div className="authContainer">
                <Card className="card" color="blue">
                    <h1 style={{fontSize: "30px"}}>Вход в систему</h1>
                    <h3>{this.state.message}</h3>
                    <div className="inputContainer">
                        <this.CssTextField className="input" value={login}  margin="dense" color="secondary" name="login" label="Логин:" onChange={this.ChangeHandler}/>
                        <this.CssTextField className="input" value={password} type="password" margin="dense" color="secondary" name="password" label="Пароль:" onChange={this.ChangeHandler}/>
                    </div>
                    {this.state.errors.login.length > 0 &&
                            <span>{this.state.errors.login}</span>}
                    {this.state.errors.password.length > 0 &&
                            <span>{this.state.errors.password}</span>}

                    <div className="buttonContainer">
                        <Button variant="outlined" disabled={!!this.state.errors.login || !!this.state.errors.password} color="primary" onClick={this.LoginHandler}>Войти</Button>
                        <Button variant="outlined" disabled={!!this.state.errors.login || !!this.state.errors.password} color="secondary" onClick={this.SignUpHandler}>Зарегистрироваться</Button>
                    </div>
                </Card>
            </div>
        );
    }
}

export default AuthPage;
