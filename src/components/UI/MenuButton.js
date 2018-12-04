import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class MenuButton extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (link) => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <FontAwesomeIcon icon="bars" inverse size="lg"/>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem component={Link} to='/' onClick={this.handleClose}>Home</MenuItem>
          <MenuItem component={Link} to='/about' onClick={this.handleClose}>About</MenuItem>
          <MenuItem component={Link} to='/contact' onClick={this.handleClose}>Contact</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MenuButton;