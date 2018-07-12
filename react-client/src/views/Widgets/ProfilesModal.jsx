import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

// @material-ui/core components

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// actions

import { fetchProfilesFromDB } from '../../actions/profiles';

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
    width: theme.spacing.unit * 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class ProfilesModal extends React.Component {
  state = {
    profile: '',
  };

  componentDidMount() {
    this.props.fetchProfilesFromDB();
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { profileData } = this.props.profiles;
    // console.log('PROFILE MODAL PROPS', this.props);

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
              {'Select a Profile'}
            </Typography><br />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="profile-native-simple">Profile</InputLabel>
              <Select
                native
                value={this.state.profile}
                onChange={this.handleChange('profile')}
                inputProps={{
                  name: 'profile',
                  id: 'profile-native-simple',
                }}
              >
                <option value="" />
                {profileData.map((profile, index) => {
                  return (
                    <option key={index} value={profile.profile}>{profile.profile}</option>
                  );
                })
                }
              </Select>
            </FormControl>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return bindActionCreators({ fetchProfilesFromDB }, dispatch);
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchtoProps),
)(ProfilesModal);
