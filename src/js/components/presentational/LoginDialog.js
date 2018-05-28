import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// import withRoot from '../withRoot';

const styles = theme => ({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 20,
    },
  });

function LoginDialog(props) {

    return(
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Hello</DialogTitle>
                <DialogContentText>1-2-3-4-5</DialogContentText>
                <DialogActions>
                    <Button color='primary' onClick={() => {props.dialogClose()}}>
                        Close me
                    </Button>
                    <Button color='primary' onClick={() => {props.authenticate('Facebook')}}>
                        Log in with Facebook
                    </Button>
                    <Button color='primary' onClick={() => {props.authenticate('Google')}}>
                        Log in with Google
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default LoginDialog;