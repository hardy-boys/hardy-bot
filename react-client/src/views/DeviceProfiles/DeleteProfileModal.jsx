import React from 'react';

// @material-ui/core components

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from 'components/CustomButtons/Button.jsx';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class DeleteProfileModal extends React.Component {
  render() {
    const { classes } = this.props;
    const { profileName } = this.props;
    const { profileIndex } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.close}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              {`Confirm Deletion of ${profileName}`}
            </Typography><br />
            <Grid
              container
              alignItems='flex-end'
              direction='row'
              justify='space-between'
            >
              <Button
                color="danger"
                onClick={() => { this.props.confirm(profileIndex); }}
                >Yes, Really
              </Button>
              <Button
                color="white"
                onClick={() => { this.props.close(profileIndex); }}
                >Nevermind
              </Button>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(DeleteProfileModal);
