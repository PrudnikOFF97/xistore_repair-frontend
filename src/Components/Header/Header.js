import React, { Component } from 'react';
import './Header.css';
import Logo from '../../img/logo.svg';
import LogoName from '../../img/logoName.svg';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircleOutlined';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const AddIconOrange = withStyles({
    root: {
        color: "#FF6700",
    },
  })(AddIcon);
  
class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className="logo">
                    <Link to={'/'} >
                        <img className="logo__img" src={Logo} alt="logo"></img>
                    </Link>
                    <img className="logo__name" src={LogoName} alt="Xistore"></img>
                </div>
                <div>
                    <Link to={'/addModel'} >
                        <Button variant="contained" color="primary">Добавить номенклатуру</Button>
                    </Link>
                    <Link to={'/create'} >
                        <IconButton><AddIconOrange /></IconButton>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;
