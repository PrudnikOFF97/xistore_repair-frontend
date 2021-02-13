import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';
import { AuthContext } from '../../Context/auth-context'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <Avatar aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}></Avatar>
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
            <AuthContext.Consumer>
                {auth => (
                    <MenuItem onClick={auth.logout}>Logout</MenuItem>

                )}
            </AuthContext.Consumer>
        </Menu>
    </div>
  );
}