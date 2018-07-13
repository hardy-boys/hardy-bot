import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';

// @material-ui/core components

import Grid from '@material-ui/core/Grid';
import GridItem from 'components/Grid/GridItem.jsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

// redux actions

import { fetchTraffic } from '../../actions/traffic';


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
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class TrafficWidgetModal extends React.Component {
  state = {
    origin: '',
    destination: '',
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit() {
    let { origin, destination } = this.state;
    this.props.fetchTraffic(origin, destination);
    this.setState({
      origin: '',
      destination: '',
    });
  }

  render() {
    const { classes } = this.props;
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
              Enter New Origin and Destination
            </Typography><br />
            <Typography variant="subheading" id="simple-modal-description">
              <Grid container>
                <GridItem xs={4}>
                  Origin: <input type="text" name="origin" onChange={this.onInputChange.bind(this)} value={this.state.origin} placeholder="Address, City, State, Zip"></input>
                </GridItem>
                <GridItem xs={4}>
                  Destination: <input type="text" name="destination" onChange={this.onInputChange.bind(this)} value={this.state.destination} placeholder="Address, City, State, Zip"></input><br/>
                </GridItem>
              <Button onClick={() => { this.onSubmit(); this.props.close(); }} type="submit">Submit</Button>
              </Grid>
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

TrafficWidgetModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    traffic: state.traffic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchTraffic }, dispatch);
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(TrafficWidgetModal);
