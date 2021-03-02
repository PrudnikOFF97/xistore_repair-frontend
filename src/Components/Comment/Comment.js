import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';


export default class Comment extends Component {
    constructor(props){
        super();
        this.state = {
            value: props.comment ? props.comment : "",
        };
    }
    ChangeHandler = (event) => {
        this.setState({value: event.target.value});
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
    SaveIconOrange = withStyles({
        root: {
            color: "#FF6700",
        },
    })(SaveIcon);

    render() {
        return (
            <div>
                <this.CssTextField name="comment"
                                value = {this.state.value}
                                onChange={(event) => this.ChangeHandler(event)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                />
                <IconButton type="submit" size="small" color="primary"><this.SaveIconOrange/></IconButton>
            </div>
        )
    }
}
