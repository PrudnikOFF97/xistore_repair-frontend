import React, { Component } from 'react'
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircleOutlined';
import './UserSettings.css';


export default class UserSettings extends Component {
    constructor(){
        super();
        this.state = {
            login: "",
            managers: [],
            addres: "",
            message: ""
        };
    }
    ChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
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
    AddIconOrange = withStyles({
        root: {
            color: "#FF6700",
        },
    })(AddIcon);
    handleClick = () => {
        const temp = this.state.managers;
        temp.push("");
        this.setState({
            managers: temp
        });    
    };
    handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.target);
        Axios.post(process.env.REACT_APP_API_URL+'/user', data)
        .then(res => {
            this.setState({message: res.data.message})
        })
        .catch(e =>{
            this.setState({message: e.response.status});
        });
    }
    componentDidMount(){
        Axios.get(process.env.REACT_APP_API_URL+'/user')
        .then(res => {
            this.setState(
                {login: res.data.login,
                managers: res.data.managers,
                addres: res.data.addres
            });
        });
    }
    render() {
        return (
            <div>
                <form className="settings" onSubmit={(event) => this.handleSubmit(event)}>
                    <h1 className="login">{this.state.login}</h1>
                    <h1>{this.state.message}</h1>
                    <div className="managersContainer">
                        <h1>Приёмщики:</h1>
                        {this.state.managers.map(manager => {
                            return(
                                <this.CssTextField className="settings__managerInput" name="managers" defaultValue={manager}/>
                            )
                        })}
                        <IconButton className="settings__addManager" onClick={this.handleClick}><this.AddIconOrange /></IconButton>
                    </div>
                    <this.CssTextField className="settings__adress" margin="dense" color="secondary" name="addres" label="Адрес:" placeholder='Могилев ТЦ "Планета Грин", ул.Островского д.5' value={this.state.addres} onChange={this.ChangeHandler}/>
                    <Button className="settings__submitButton" type="submit" variant="outlined" color="primary">Сохранить</Button>

                </form>
            </div>
        )
    }
}
