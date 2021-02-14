import React, { Component } from 'react';
import './Header.css';
import Logo from '../../img/logo.svg';
import LogoName from '../../img/logoName.svg';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircleOutlined';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AvatarMenu from '../AvatarMenu/AvatarMenu';
import { AuthContext } from '../../Context/auth-context';

const AddIconOrange = withStyles({
    root: {
        color: "#FF6700",
    },
  })(AddIcon);
  
class Header extends Component {
    static contextType = AuthContext;
    render() {
        return (
            <div className='header'>
                <div className="logo">
                    <Link to={'/'} >
                        <img className="logo__img" src={Logo} alt="logo"></img>
                    </Link>
                    <img className="logo__name" src={LogoName} alt="Xistore"></img>
                </div>
                {this.context.isLoggedIn &&
                <div className="actions">
                    <Link to={'/addModel'} >
                        <Button variant="contained" color="primary">Добавить номенклатуру</Button>
                    </Link>
                    <Link to={'/create'} >
                        <IconButton><AddIconOrange /></IconButton>
                    </Link>
                    <AvatarMenu/>
                </div>}

            </div>
        );
    }
}

export default Header;
