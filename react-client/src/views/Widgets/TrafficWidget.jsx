import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Gauge from 'react-svg-gauge';

// @material-ui/core components

import Grid from '@material-ui/core/Grid';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';


// components

import TrafficWidgetModal from './TrafficWidgetModal';
import ProfilesModal from './ProfilesModal';

class TrafficWidget extends React.Component {
  state = {
    openEditModal: false,
    openProfileModal: false,
    value: 0,
  };

  handleEditOpen = () => {
    this.setState({ openEditModal: true });
  };

  handleEditClose = () => {
    this.setState({ openEditModal: false });
  };

  handleOpenProfile = () => {
    this.setState({ openProfileModal: true });
  };

  handleProfileClose = () => {
    this.setState({ openProfileModal: false });
  };

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
            )}
            <GridItem xs={5}>
              <Gauge color={this.setGaugeColor(traffic)} value={traffic} min={0} max={10} width={200} height={175} label="Traffic" />
            </GridItem>
          </Grid>
          <Button onClick={this.handleEditOpen.bind(this)} color="primary">Edit Widget</Button>
          <Button onClick={this.handleOpenProfile.bind(this)} color="primary">Add to Profile</Button>
          <TrafficWidgetModal
            open={this.state.openEditModal}
            close={this.handleEditClose.bind(this)}
          />
          <ProfilesModal
            open={this.state.openProfileModal}
            close={this.handleProfileClose.bind(this)}
          />
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
