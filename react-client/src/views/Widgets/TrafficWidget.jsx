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

  componentDidMount() {
    // let zip = this.checkUserConfigs();
    // this.props.startWeatherPolling(zip);
  }

  componentWillUnmount() {
    // this.props.stopWeatherPolling();
  }

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

  render() {
    console.log('PROPS', this.props);
    let { travelDistance, travelDuration, travelDurationTraffic } = this.props.traffic.trafficData;
    let traffic = Math.ceil((travelDurationTraffic - travelDuration) / 60);
    // if (this.props.weather.fetched) {
    return (
        <div>
          <Grid container justify="flex-end">
            <GridItem xs={5}>
              <h6>Distance:</h6>{travelDistance}mi
              <h6>Duration:</h6>{travelDuration}s
              <h6>Duration with Traffic:</h6>{travelDurationTraffic}s
            </GridItem>
            <GridItem xs={5}>
              <Gauge value={traffic} min={0} max={10} width={200} height={175} label="Traffic" />
            </GridItem>
          </Grid>
          <Button onClick={this.handleOpen.bind(this)} color="primary">Edit Widget</Button>
          <Button color="primary">Add to Profile</Button>
          <TrafficWidgetModal open={this.state.open} close={this.handleClose.bind(this)} />
        </div>
    );
    // } else {
    //   return (
    //     <div>
    //       <p>Loading...</p>
    //     </div>
    //   );
    // }
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
