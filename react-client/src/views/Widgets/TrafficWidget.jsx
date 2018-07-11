import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Gauge from 'react-svg-gauge';

// @material-ui/core components

import Grid from '@material-ui/core/Grid';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import Button from 'components/CustomButtons/Button.jsx';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

// components

import TrafficWidgetModal from './TrafficWidgetModal';

// actions

// import { startWeatherPolling, stopWeatherPolling } from '../../actions/weather';

class TrafficWidget extends React.Component {
  // Temporary state until it gets refactored to Redux
  state = {
    open: false,
    anchorEl: null,
    value: 0,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // handleClick = (event) => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  // handleProfileClose = () => {
  //   this.setState({ anchorEl: null });
  // };

  // checkUserConfigs() {
  // }

  setGaugeColor = (traffic) => {
    if (traffic >= 0 && traffic <= 3.33) {
      return 'green';
    }
    if (traffic >= 3.33 && traffic <= 6.66) {
      return 'yellow';
    }
    if (traffic >= 6.66 && traffic <= 10) {
      return 'red';
    } else {
      return '';
    }
  }

  render() {
    // console.log('PROPS', this.props);
    let { travelDistance, travelDuration, travelDurationTraffic } = this.props.traffic.trafficData;
    let traffic = Math.ceil((travelDurationTraffic - travelDuration) / 60) || '';
    let { trafficData } = this.props.traffic;


    return (
        <div>
          <Grid container>
            {Object.keys(trafficData).length ? (
              <GridItem xs={6}>
                Distance:{travelDistance.toFixed(2)}mi<br />
                Duration:{(travelDuration / 60).toFixed(2)}mins<br />
                Duration with Traffic:{(travelDurationTraffic / 60).toFixed(2)}mins
              </GridItem>
            ) : (
              <GridItem xs={6}>
                <h5>Please enter an origin and destination</h5>
              </GridItem>
            )};
            <GridItem xs={5}>
              <Gauge color={this.setGaugeColor(traffic)} value={traffic} min={0} max={10} width={200} height={175} label="Traffic" />
            </GridItem>
          </Grid>
          <Button onClick={this.handleOpen.bind(this)} color="primary">Edit Widget</Button>
          <Button color="primary">Add to Profile</Button>
          <TrafficWidgetModal open={this.state.open} close={this.handleClose.bind(this)} />
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    traffic: state.traffic,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default compose(connect(mapStateToProps, mapDispatchtoProps))(TrafficWidget);
