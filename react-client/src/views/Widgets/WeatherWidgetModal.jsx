import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import fetchWeather from '../../actions/weather';


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

class WeatherWidgetModal extends React.Component {
  state = {
    zip: '',
  };

  onInputChange(event) {
    this.setState({
      zip: event.target.value,
    });
  }

  onSubmit() {
    this.props.fetchWeather(this.state.zip);
  }

  render() {
    const { classes } = this.props;
    console.log('PROPS', this.props);
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
              Enter New Zipcode
            </Typography><br />
            <Typography variant="subheading" id="simple-modal-description">
              Zip: <input
              type="text"
              onChange={this.onInputChange.bind(this)}
              value={this.state.zip}
              ></input>
              <Button onClick={() => { this.onSubmit(); this.props.close(); }} type="submit">Submit</Button>
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

WeatherWidgetModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchWeather }, dispatch);
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(WeatherWidgetModal);
