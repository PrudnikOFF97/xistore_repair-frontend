import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';



class DateForm extends Component {
    constructor(props) {
        super();
    }
        
    render() {
        const CssTextField = withStyles({
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

        const SaveIconOrange = withStyles({
            root: {
                color: "#FF6700",
            },
        })(SaveIcon);
        const inputProps = {
          min: this.props.columnId === "sendingDate" ? this.props.row.date ? this.props.row.date.split(".").reverse().join("-") : "" : this.props.columnId === "receivingDate" ? this.props.row.sendingDate ? this.props.row.sendingDate.split(".").reverse().join("-") : this.props.row.date ? this.props.row.date.split(".").reverse().join("-") : "" : this.props.columnId === "issueDate" ? this.props.row.receivingDate ? this.props.row.receivingDate.split(".").reverse().join("-") : this.props.row.sendingDate ? this.props.row.sendingDate.split(".").reverse().join("-") : this.props.row.date ? this.props.row.date.split(".").reverse().join("-") : "" : "",
          max: this.props.columnId === "issueDate" ? "" : this.props.columnId === "receivingDate" ? this.props.row.issueDate ? this.props.row.issueDate.split(".").reverse().join("-") : "" : this.props.columnId === "sendingDate" ? this.props.row.receivingDate ? this.props.row.receivingDate.split(".").reverse().join("-") : this.props.row.issueDate ? this.props.row.issueDate.split(".").reverse().join("-") : "" : "",
        };
        return (
            <>
                <CssTextField name={this.props.columnId}
                                type="date"
                                defaultValue=""
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={inputProps}
                />
                <IconButton type="submit" size="small" color="primary"><SaveIconOrange /></IconButton>
            </>
        );
    }
}

export default DateForm;
