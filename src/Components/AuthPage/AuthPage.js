import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './AuthPage.css'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';




class AuthPage extends Component {
    constructor(){
        super();
        this.state = {
            login: "",
            password: "",
            errors: {
                login: '',
                password: ''
            }
        };
    }
    ChangeHandler = (event) =>{
        let errors = this.state.errors;
        this.setState({[event.target.name]: event.target.value});
        switch (event.target.name) {

            case 'login':
                if (event.target.value.length === 0) {
                    errors.login =
                    event.target.value.length < 5
                            ? 'Login is Required!'
                            : '';
                    break;
                }
                break;
            case 'password':
                if (event.target.value.length > 0) {
                    errors.password =
                    event.target.value.length < 6
                            ? 'Password must be 6 characters long!'
                            : '';
                }

                if (event.target.value.length === 0) {
                    errors.password =
                    event.target.value.length === 0
                            ? 'Password is required!'
                            : '';
                }
                break;
            default:
                break;
        }
        this.setState({errors: errors});
        // console.log(`${event.target.name} : ${this.state[event.target.name]}`);
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
                    <div className="inputContainer">
                        <this.CssTextField className="input" value={login}  margin="dense" color="secondary" name="login" label="Логин:" onChange={this.ChangeHandler}/>
                        {this.state.errors.login.length > 0 &&
                            <span className='error text-danger'>{this.state.errors.email}</span>}
                        <this.CssTextField className="input" value={password} type="password" margin="dense" color="secondary" name="password" label="Пароль:" onChange={this.ChangeHandler}/>
                    </div>
                    <div className="buttonContainer">
                        <Button variant="outlined" color="primary">Войти</Button>
                        <Button variant="outlined" color="secondary">Зарегистрироваться</Button>
                    </div>
                </Card>
            </div>
        );
    }
}

export default AuthPage;
