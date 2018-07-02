import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import io from 'socket.io-client';
import axios from 'axios';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
// import Table from "components/Table/Table.jsx";
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import Language from '@material-ui/icons/Language';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import WbSunny from '@material-ui/icons/WbSunny';
import GolfCourse from '@material-ui/icons/GolfCourse';

import { fetchWeather } from '../../actions/weather';

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
};

class Widgets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zipcode: 78702,
    };

    // Quick button click handlers for demonstration
    this.handlePolling = this.handlePolling.bind(this);
    this.handleDeploy = this.handleDeploy.bind(this);
  }

  componentDidMount() {
    axios.get('/particle/login')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handlePolling(e, widgetName) {
    console.log('Polling clicked: ', widgetName);
    axios.get(`/api/${widgetName}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDeploy(e, widgetName) {
    console.log('Deploy clicked: ', widgetName);
    axios.get(`/particle/flash/${widgetName}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    let weatherView;
    if (this.props.weather.fetched) {
      const city = this.props.weather.weatherData.name;
      const { temp } = this.props.weather.weatherData.main;
      const { humidity } = this.props.weather.weatherData.main;

      weatherView = (
        <div>
          <p> City: {city} </p>
          <p> Current Temp: {temp} </p>
          <p> Humidity: {humidity} %</p>
        </div>
      );
    } else {
      weatherView = (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    let stockView;
    if (this.props.stocks.fetched) {
      const { symbol, data } = this.props.stocks.stockData;

      stockView = (
        <div>
          <p> Stock: {symbol} </p>
          <p> Current Price: {data} </p>
        </div>
      );
    } else {
      stockView = (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Widgets</h4>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="rose" icon>
                      <CardIcon color="rose">
                        <WbSunny />
                      </CardIcon>
                    </CardHeader>
                    <CardBody>
                      <h4 className={classes.cardTitle}>Weather</h4>
                      { weatherView }
                      <Button color="primary" onClick={e => this.handlePolling(e, 'weather')}>Start Polling</Button>
                      <Button color="primary" onClick={e => this.handleDeploy(e, 'weather')}>Deploy to Device</Button>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="rose" icon>
                      <CardIcon color="rose">
                        <Language />
                      </CardIcon>
                    </CardHeader>
                    <CardBody>
                      <h4 className={classes.cardTitle}>Stocks</h4>
                      { stockView }
                      <Button color="primary" onClick={e => this.handlePolling(e, 'stocks')}>Start Polling</Button>
                      <Button color="primary" onClick={e => this.handleDeploy(e, 'stocks')}>Deploy to Device</Button>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="rose" icon>
                      <CardIcon color="rose">
                        <DirectionsCar />
                      </CardIcon>
                    </CardHeader>
                    <CardBody>
                      <h4 className={classes.cardTitle}>Traffic</h4>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="rose" icon>
                      <CardIcon color="rose">
                        <GolfCourse />
                      </CardIcon>
                    </CardHeader>
                    <CardBody>
                      <h4 className={classes.cardTitle}>Sports</h4>
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

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ fetchWeather }, dispatch);
// };

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
    stocks: state.stocks,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  // connect(null, mapDispatchToProps),
)(Widgets);

