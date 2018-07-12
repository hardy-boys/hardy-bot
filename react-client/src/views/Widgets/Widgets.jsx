import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// @material-ui/core components

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

// core components

import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import Subject from '@material-ui/icons/Subject';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import WbSunny from '@material-ui/icons/WbSunny';
import TrendingUp from '@material-ui/icons/TrendingUp';

// components

import WeatherWidget from './WeatherWidget.jsx';
import StocksWidget from './StocksWidget.jsx';
import NewsWidget from './NewsWidget.jsx';
import TrafficWidget from './TrafficWidget';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  cardTitleBlack: {
    color: '#000',
    marginTop: '13px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

class Widgets extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Widgets Store</h4>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="info" icon>
                      <CardIcon color="info">
                        <WbSunny />
                      </CardIcon>
                      <h4 className={classes.cardTitleBlack}>Weather</h4>
                    </CardHeader>
                    <CardBody>
                      <WeatherWidget />
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="info" icon>
                      <CardIcon color="info">
                        <TrendingUp />
                      </CardIcon>
                      <h4 className={classes.cardTitleBlack}>Stocks</h4>
                    </CardHeader>
                    <CardBody>
                      <StocksWidget />
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="info" icon>
                      <CardIcon color="info">
                        <Subject />
                      </CardIcon>
                      <h4 className={classes.cardTitleBlack}>News</h4>
                    </CardHeader>
                    <CardBody>
                      <NewsWidget />
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="info" icon>
                      <CardIcon color="info">
                        <DirectionsCar />
                      </CardIcon>
                      <h4 className={classes.cardTitleBlack}>Traffic</h4>
                    </CardHeader>
                    <CardBody>
                      <TrafficWidget />
                    </CardBody>
                  </Card>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

// Give component access to Redux application state
const mapStateToProps = (state) => {
  return {
    stocks: state.stocks,
  };
};

// Connect component to Redux store
export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Widgets);

