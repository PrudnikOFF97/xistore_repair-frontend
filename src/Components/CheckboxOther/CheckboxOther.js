import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const OrangeCheckbox = withStyles({
    root: {
      color: '#FF6700',
      '&$checked': {
        color: '#FF6700',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

class CheckboxOther extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            value: "",
        };
    }
    render() {
        const change = () => {
            this.setState({active: !this.state.active});
            if(this.state.active){
                this.setState({value: ""});
            }
        }    
        const handleChange = (event) => {
            this.setState({value: event.target.value});
        }
        return (
            <div className="check_text">
                <OrangeCheckbox name="equipment" disabled={this.props.disabled} className="checkbox__other" onClick={change} value={this.state.value}/>
                <TextField margin="dense" variant="outlined" disabled={!this.state.active || this.props.disabled} value={!this.state.value ? "" : this.state.value} label="Другое" onChange={handleChange}/>
            </div>        
            );
    }
}

export default CheckboxOther;