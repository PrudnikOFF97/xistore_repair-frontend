import React, { useEffect } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';
import { AuthContext } from '../../Context/auth-context'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Axios from 'axios';


export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = React.useState(' ');
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setTimeout(() => {
      Axios.get(`${process.env.REACT_APP_API_URL}/user`)
      .then(
        (result) => {
          setName(result.data.login);
        }
      )
      .then(setIsLoaded(true))
      .catch(setIsLoaded(true))
    }, 0);
  }, []);

  return (
    <div className="avatar">
      <Avatar aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{isLoaded ? name.split('')[0].toUpperCase() : ''}</Avatar>
      <Menu 
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/settings">
          <MenuItem onClick={handleClose}>Настройки</MenuItem>
        </Link>
        <Link to="/addModel">
          <MenuItem onClick={handleClose}>Добавить номенклатуру</MenuItem>
        </Link>
        <AuthContext.Consumer>
          {auth => (
            <MenuItem onClick={auth.logout}>Logout</MenuItem>
          )}
        </AuthContext.Consumer>
      </Menu>
    </div>
  );
}