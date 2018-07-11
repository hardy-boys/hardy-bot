import React from 'react';
import axios from 'axios';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
// import CardAvatar from 'components/Card/CardAvatar.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

import avatar from 'assets/img/faces/marc.jpg';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      zip: '',
    };
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.enterEmail = this.enterEmail.bind(this);
    this.enterPassword = this.enterPassword.bind(this);
    this.enterZip = this.enterZip.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  enterPassword(e) {
    console.log('test');
    this.setState({
      password: e.target.value,
    });
  }

  enterEmail(e) {
    console.log('hi');
    this.setState({
      email: e.target.value,
    });
  }

  enterZip(e) {
    console.log('hi');
    this.setState({
      zip: e.target.value,
    });
  }

  handleSubscribe() {
    console.log('ahhhhh', this.state.email, this.state.password, this.state.zip);
    axios.post('/subscribe', {
      email: this.state.email,
      password: this.state.password,
      zip: this.state.zip,
    });
  }

  handleKeyPress(event) {
    console.log('hi');
    if (event.key === 'Enter') {
      this.handleSubscribe();
    }
  }

  render() {
    const { classes } = this.props;

    return (
    <div style={{ margin: '70px' }}>
      <Grid container justify='center'>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>HardyBot</h4>
              <p className={classes.cardCategoryWhite}>Sign up</p>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Email address"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: this.state.email,
                      onChange: this.enterEmail,
                      onKeyPress: this.handleKeyPress,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: this.state.password,
                      onChange: this.enterPassword,
                      onKeyPress: this.handleKeyPress,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="ZIP Code"
                    id="zipCode"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: this.state.zip,
                      onChange: this.enterZip,
                      onKeyPress: this.handleKeyPress,
                    }}
                  />
                </GridItem>
              </Grid>
            </CardBody>
            <CardFooter>
              <Button color="primary"
              fullWidth={true}
              onClick={this.handleSubscribe}>Sign up</Button>
            </CardFooter>
            <div style={{ textAlign: 'center' }}>
              <p>Already have an account? <a className='login' href='/login'>Login</a></p>
            </div>
          </Card>
        </GridItem>
      </Grid>
    </div>
    );
  }
}

export default withStyles(styles)(Signup);
