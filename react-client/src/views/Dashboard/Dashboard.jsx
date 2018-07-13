import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MoonLoader } from 'react-spinners';

// react plugin for creating charts

import ChartistGraph from 'react-chartist';

// @material-ui/core

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

// @material-ui/icons

import ContentCopy from '@material-ui/icons/ContentCopy';
import InfoOutline from '@material-ui/icons/InfoOutline';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import DonutLarge from '@material-ui/icons/DonutLarge';
import DonutSmall from '@material-ui/icons/DonutSmall';
import Memory from '@material-ui/icons/Memory';
import FlipToFront from '@material-ui/icons/FlipToFront';

// core components

import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

// charts
import {
  hourlyNetworkChart,
  uptimeChart,
} from 'variables/charts';

// styles
import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';

// actions

import { getUserConfigs } from '../../actions/users';
import { signInToParticle } from '../../actions/particle';

class Dashboard extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    // Need to get userId from user session
    const userId = 1;
    this.props.getUserConfigs(userId);
    this.props.signInToParticle();
  }

  render() {
    // console.log('DASHBOARD PROPS', this.props);
    const { classes } = this.props;
    const { devices, deviceInfo } = this.props.particle;

    if (devices.length && deviceInfo.deviceStats && deviceInfo.deviceStats.diagnostics.payload) {
      let usedMemory = Math.ceil((deviceInfo.deviceStats.diagnostics.payload.device.system.memory.used / 1000));
      let totalMemory = Math.ceil((deviceInfo.deviceStats.diagnostics.payload.device.system.memory.total / 1000));
      let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
      };

      let lastOnline = new Date(deviceInfo.deviceStats.diagnostics.updated_at).toLocaleString('en-US', options);

      return (
        <div>
          <Grid container>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{deviceInfo.deviceName}</h4>
                  <p className={classes.cardCategoryWhite}>LCD Display</p>
                </CardHeader>
              </Card>
            </GridItem>
          </Grid>
          <Grid container>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardHeader color={deviceInfo.deviceStats.status === 'online' ? 'success' : 'danger'} stats icon>
                  <CardIcon color={deviceInfo.deviceStats.status === 'online' ? 'success' : 'danger'}>
                    {deviceInfo.deviceStats.status === 'online' ?
                    (
                      <DonutLarge />
                    ) : (
                      <DonutSmall />
                    )
                  }
                  </CardIcon>
                  <p className={classes.cardCategory}>Current Status</p>
                  <h3 className={classes.cardTitle}>{deviceInfo.deviceStats.status}</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    Last Online: {lastOnline.toString()}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Memory />
                  </CardIcon>
                  <p className={classes.cardCategory}>Used Space</p>
                  {/* This is data we need to get from the device */}
                  <h3 className={classes.cardTitle}>
                    {usedMemory}/{totalMemory}<small>KB</small>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <FlipToFront />
                  </CardIcon>
                  <p className={classes.cardCategory}>Current Profile</p>
                  {/* Render device profile from database */}
                  <h3 className={classes.cardTitle}>Weather</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                  {/* Make this into a button that will redirect them to the profiles page */}
                    {/* <LocalOffer />
                    Change Profile */}
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </Grid>
          <Grid container>
            <GridItem xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="primary">
                  <ChartistGraph
                    className="ct-chart"
                    data={hourlyNetworkChart.data}
                    type="Line"
                    options={hourlyNetworkChart.options}
                    listener={hourlyNetworkChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Network Strength</h4>
                  {/* <p className={classes.cardCategory}>
                    <span className={classes.successText}>
                    Get this data from device
                      <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                    </span>{' '}
                    increase in activity
                  </p> */}
                </CardBody>
                {/* <CardFooter chart>
                  <div className={classes.stats}> */}
                  {/* Get this data from device */}
                    {/* <AccessTime /> updated 4 minutes ago
                  </div>
                </CardFooter> */}
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="primary">
                  <ChartistGraph
                    className="ct-chart"
                    data={uptimeChart.data}
                    type="Bar"
                    options={uptimeChart.options}
                    responsiveOptions={uptimeChart.responsiveOptions}
                    listener={uptimeChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Uptime</h4>
                  {/* <p className={classes.cardCategory}>
                    Longest Uptime
                  </p> */}
                </CardBody>
                {/* <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> 48 hours
                  </div>
                </CardFooter> */}
              </Card>
            </GridItem>
          </Grid>
        </div>
      );
    } else {
      return (
        <Grid
          container
          spacing={16}
          alignItems='center'
          direction='column'
          justify='center'
        >
          <h1>Loading device...</h1>
          <MoonLoader
            color={'#333333'}
            loading={this.state.loading}
          />
        </Grid>
      );
    }
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    particle: state.particle,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return bindActionCreators({ getUserConfigs, signInToParticle }, dispatch);
};

export default compose(
  withStyles(dashboardStyle),
  connect(mapStateToProps, mapDispatchtoProps),
)(Dashboard);
