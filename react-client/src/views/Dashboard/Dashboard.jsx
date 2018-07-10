import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

// react plugin for creating charts

import ChartistGraph from 'react-chartist';

// @material-ui/core

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

// @material-ui/icons

import ContentCopy from '@material-ui/icons/ContentCopy';
import Store from '@material-ui/icons/Store';
import InfoOutline from '@material-ui/icons/InfoOutline';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';

// core components

import GridItem from 'components/Grid/GridItem.jsx';
import Danger from 'components/Typography/Danger.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

// charts
import {
  dailySalesChart,
  emailsSubscriptionChart,
  // completedTasksChart
} from 'variables/charts';

// styles
import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx';

// actions

import { getUserConfigs } from '../../actions/users';

class Dashboard extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     userId: 2,
  //   };
  // }

  componentDidMount() {
    // Need to get userId from user session
    const userId = 1;
    this.props.getUserConfigs(userId);

    axios.get('/particle/login')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // getUserDevices(userId) {
  //   axios.get(`/users/${userId}`)
  //     .then((devices) => {
  //       console.log('DEVICES', devices);
  //     })
  //     .catch((err) => {
  //       console.log('ERROR', err);
  //     });
  // }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
              {/* Get device info from db */}
                <h4 className={classes.cardTitleWhite}>Savvy Fox</h4>
                <p className={classes.cardCategoryWhite}>LCD Display</p>
              </CardHeader>
            </Card>
          </GridItem>
        </Grid>
        <Grid container>
          <GridItem xs={4} sm={4} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Current Status</p>
                {/* This is data we need to get from the device */}
                <h3 className={classes.cardTitle}>Offline</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  {/* This is data we need to get from the device */}
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <ContentCopy />
                </CardIcon>
                <p className={classes.cardCategory}>Used Space</p>
                {/* This is data we need to get from the device */}
                <h3 className={classes.cardTitle}>
                  49/50 <small>GB</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  {/* Dynamically render based on avaialable space */}
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <InfoOutline />
                </CardIcon>
                <p className={classes.cardCategory}>Current Profile</p>
                {/* Render device profile from database */}
                <h3 className={classes.cardTitle}>Weather</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                {/* Make this into a button that will redirect them to the profiles page */}
                  <LocalOffer />
                  Change Profile
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
        <Grid container>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Network Activity</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                  {/* Get this data from device */}
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{' '}
                  increase in activity
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                {/* Get this data from device */}
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Uptime</h4>
                <p className={classes.cardCategory}>
                  Longest Uptime
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> 48 hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userDevices: state.userDevices,
    user: state.user,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return bindActionCreators({ getUserConfigs }, dispatch);
};

export default compose(
  withStyles(dashboardStyle),
  connect(mapStateToProps, mapDispatchtoProps),
)(Dashboard);
