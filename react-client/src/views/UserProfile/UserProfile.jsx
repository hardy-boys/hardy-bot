import React from 'react';
import axios from 'axios';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
// import CardAvatar from 'components/Card/CardAvatar.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';

import avatar from 'assets/img/faces/marc.jpg';

const styles = {
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

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      zip: '',
      particleToken: '',
      edit: true,
    };
    this.enterEmail = this.enterEmail.bind(this);
    this.enterPassword = this.enterPassword.bind(this);
    this.enterZip = this.enterZip.bind(this);
    this.enterParticleToken = this.enterParticleToken.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    console.log('ASLDJGALSGJ');
    axios.get('/profileInfo')
      .then((result) => {
        console.log('USERPROFILE RESULT', result);
        this.setState({
          email: result.data.email,
          zip: result.data.zipcode,
          particleToken: result.data.particleToken,
        });
      });
  }

  enterEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  enterPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  enterZip(e) {
    this.setState({
      zip: e.target.value,
    });
  }

  enterParticleToken(e) {
    this.setState({
      particleToken: e.target.value,
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleEditProfile();
    }
  }

  handleEditProfile() {
    this.setState({
      edit: !this.state.edit,
    });
    if (this.state.edit) {
      this.setState({
        updateButton: 'rose',
      });
    } else {
      this.setState({
        updateButton: null,
      });
    }
  }

  handleUpdate() {
    this.setState({
      edit: !this.state.edit,
    });
    if (this.state.edit) {
      this.setState({
        updateButton: 'rose',
      });
    } else {
      this.setState({
        updateButton: null,
      });
    }
    axios.post('/updateProfile', {
      email: this.state.email,
      password: this.state.password,
      zip: this.state.zip,
      particleToken: this.state.particleToken,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Profile</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl fullWidth={true} disabled={true} aria-describedby="name-error-text">
                    <InputLabel htmlFor="name-error">{this.state.email}</InputLabel>
                    <Input id="name-error" onChange={this.enterEmail} onKeyPress={this.handleKeyPress} />
                    <FormHelperText id="name-error-text">Email</FormHelperText>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl error={!this.state.edit} fullWidth={true} disabled={this.state.edit} aria-describedby="name-error-text">
                    <InputLabel htmlFor="name-error">{this.state.password}</InputLabel>
                    <Input id="name-error" fullWidth={true} onChange={this.enterPassword} onKeyPress={this.handleKeyPress} />
                    <FormHelperText id="name-error-text">Password</FormHelperText>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl error={!this.state.edit} fullWidth={true} disabled={this.state.edit} aria-describedby="name-error-text">
                    <InputLabel htmlFor="name-error">{this.state.zip}</InputLabel>
                    <Input id="name-error" fullWidth={true} onChange={this.enterZip} onKeyPress={this.handleKeyPress} />
                    <FormHelperText id="name-error-text">ZIP</FormHelperText>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl error={!this.state.edit} fullWidth={true} disabled={this.state.edit} aria-describedby="name-error-text">
                    <InputLabel htmlFor="name-error">{this.state.particleToken}</InputLabel>
                    <Input id="name-error" fullWidth={true} onChange={this.enterParticleToken} onKeyPress={this.handleKeyPress} />
                    <FormHelperText id="name-error-text">Particle Token</FormHelperText>
                    </FormControl>
                  </GridItem>
                </Grid>
                <Grid container>
                </Grid>
                <Grid container>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary"
                onClick={this.handleEditProfile}
                disabled={!this.state.edit}>Edit Profile</Button>
                <Button
                onClick={this.handleUpdate}
                color={this.state.updateButton}
                disabled={this.state.edit}>Update</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
