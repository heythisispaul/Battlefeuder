import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginDialog from './LoginDialog';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component {

    dialogClose = () => {
        this.setState({ dialog: false })
    }

    constructor(props) {
        super();
        this.state = { dialog: false };
    } 

    render() {
        return (
          <div className={this.props.classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={this.props.classes.flex}>
                  Battlefeud
                </Typography>
                {this.props.isLoggedIn ? 
                    <React.Fragment>
                        <Avatar src={this.props.photoURL}/> 
                        <Button color="inherit" onClick={() => {this.props.logout(); this.dialogClose()}}>Logout
                        </Button>
                    </React.Fragment> 
                    : <Button color="inherit" onClick={() => {this.setState({ dialog: true })}}>Login</Button>}
              </Toolbar>
              { this.state.dialog && !this.props.isLoggedIn ? 
              <LoginDialog 
                open={this.state.dialog} 
                dialogClose={this.dialogClose} 
                authenticate={this.props.authenticate} 
                isLoggedIn={this.props.isLoggedIn} 
                /> : null}
            </AppBar>
          </div>
        );
    }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);