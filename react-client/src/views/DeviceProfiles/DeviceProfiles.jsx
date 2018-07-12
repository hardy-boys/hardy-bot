import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import axios from 'axios';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons
import DeleteIcon from '@material-ui/icons/Delete';
import CardIcon from 'components/Card/CardIcon.jsx';
import Language from '@material-ui/icons/Language';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import WbSunny from '@material-ui/icons/WbSunny';
import GolfCourse from '@material-ui/icons/GolfCourse';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import Done from '@material-ui/icons/Done';
import Save from '@material-ui/icons/Save';
import GetApp from '@material-ui/icons/GetApp';
import Add from '@material-ui/icons/Add';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import WidgetTable from 'components/Table/WidgetTable.jsx';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { MoonLoader } from 'react-spinners';
import DeleteProfileModal from 'views/DeviceProfiles/DeleteProfileModal.jsx';
import WidgetSelectModal from 'views/DeviceProfiles/WidgetSelectModal.jsx';
import SnackbarContent from 'components/Snackbar/SnackbarContent.jsx';


import {
  fetchProfilesFromDB,
  updateProfiles,
  deployProfileToDevice,
  saveProfileToDB,
  deleteProfileFromDB,
} from '../../actions/profiles';

const styles = {
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
  cssLabel: {
    color: '#FFFFFF',
  },
  cssFocused: {
    '&$cssFocused': {
      color: '#FFFFFF',
    },
  },
  cssUnderline: {
    '&:before': {
      borderBottomColor: '#FFFFFF',
    },
    '&:after': {
      borderBottomColor: '#FFFFFF',
    },
  },
};

class DeviceProfiles extends React.Component {
  state = {
    showWidgetSelectModal: null,
  }
  componentDidMount() {
    this.props.fetchProfilesFromDB();
  }

  handleEditProfileClick = (profIdx) => {
    let updatedProfiles = this.props.profiles.profileData;
    updatedProfiles[profIdx].editing = true;
    this.props.updateProfiles(updatedProfiles);
  }

  handleDeleteProfileClick = (profIdx) => {
    let updatedProfiles = this.props.profiles.profileData;
    updatedProfiles[profIdx].deleting = true;
    this.props.updateProfiles(updatedProfiles);
  }

  handleDeleteModalClose = (profIdx) => {
    let updatedProfiles = this.props.profiles.profileData;
    updatedProfiles[profIdx].deleting = false;
    this.props.updateProfiles(updatedProfiles);
  }

  handleDeleteModalConfirm = (profIdx) => {
    let currentProfiles = this.props.profiles.profileData;
    this.props.deleteProfileFromDB(currentProfiles, profIdx);
  }

  handleSaveProfileClick = (profIdx) => {
    let currentProfiles = this.props.profiles.profileData;
    console.log(profIdx);
    let prevName = this.props.profiles.profileBackup[profIdx] ?
      this.props.profiles.profileBackup[profIdx].profile : null;
    this.props.saveProfileToDB(currentProfiles, profIdx, prevName);
  }

  handleCancelClick = (profIdx) => {
    let updatedProfiles = this.props.profiles.profileData;
    // don't process new/empty profiles
    if (updatedProfiles[profIdx].widgets.length) {
      // restore profile state from backup
      updatedProfiles[profIdx] = JSON.parse(JSON.stringify(this.props.profiles.profileBackup[profIdx]));
      this.props.updateProfiles(updatedProfiles);
    }
  }

  handleWidgetModalSelect = (widget, profIdx) => {
    this.setState({
      showWidgetSelectModal: null,
    });
    console.log(`Selected ${widget}`);
    let updatedProfiles = this.props.profiles.profileData;
    updatedProfiles[profIdx].widgets.push(widget);
    this.props.updateProfiles(updatedProfiles);
  }

  handleWidgetModalClose = () => {
    this.setState({
      showWidgetSelectModal: null,
    });
  }

  handleAddWidgetClick = (profIdx) => {
    this.setState({
      showWidgetSelectModal: profIdx,
    });
  }

  handleDeployClick = (profIdx) => {
    const { deviceInfo } = this.props.particle;
    let profile = this.props.profiles.profileData[profIdx];
    this.props.deployProfileToDevice(profile, deviceInfo.deviceName);
  }

  handleAddProfileClick = () => {
    let updatedProfiles = this.props.profiles.profileData;
    updatedProfiles.push({
      profile: 'NewProfile',
      widgets: [],
      editing: true,
      deleting: false,
    });
    this.props.updateProfiles(updatedProfiles);
  }

  handleProfileNameChange = (e, profIdx) => {
    if (e) {
      console.log(`Editing profile name, Index: ${profIdx} Value: ${e.target.value}`);
      let updatedProfiles = this.props.profiles.profileData;
      updatedProfiles[profIdx].profile = e.target.value;
      this.props.updateProfiles(updatedProfiles);
    }
  }

  render() {
    // console.log('PROPS', this.props);
    const { classes } = this.props;
    const profiles = this.props.profiles.profileData;
    let pageView;
    if (this.props.profiles.loading) {
      pageView = (
        <Grid
          container
          spacing={16}
          alignItems='center'
          direction='column'
          justify='center'
        >
          <h1>Loading profiles...</h1>
          <MoonLoader
            color={'#333333'}
            loading={this.props.profiles.loading}
          />
        </Grid>
      );
    } else {
      pageView = (
        <React.Fragment>
          <Grid container>
            {/* <GridItem xs={12} sm={12} md={6}>
              <SnackbarContent color='info' message={'Test Notification'} />
            </GridItem> */}
            {profiles.map((profile, index) => {
              // limit to 4 widgets due to device restrictions
              let widgetMax = profile.widgets.length >= 4;
              return (
                <GridItem xs={12} sm={12} md={6} key={index}>
                  <Card>
                    <CardHeader color="primary">
                      <Grid
                        container
                        alignItems='flex-end'
                        direction='row'
                        justify='space-between'
                      >
                      {profile.editing ?
                          (<FormControl fullWidth={false} >
                            <InputLabel
                              FormLabelClasses={{
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                              }}
                            >
                              {profile.profile}
                            </InputLabel>
                            <Input
                              classes={{
                                root: classes.cssUnderline,
                                focused: classes.cssFocused,
                                underline: classes.cssUnderline,
                              }}
                              onChange={(e) => { this.handleProfileNameChange(e, index); } }
                            />
                            <FormHelperText
                              classes={{
                                root: classes.cssLabel,
                              }}
                             >
                              ProfileName
                             </FormHelperText>
                          </FormControl>
                          ) :
                          (
                          <h3 className={classes.cardTitleWhite}>
                            {profile.profile}
                          </h3>
                          )
                      }
                        <div>
                          <Fade in={!profile.editing}>
                            <IconButton
                              aria-label="Deploy"
                              className={classes.tableActionButton}
                              disabled={profile.editing}
                              onClick={() => { this.handleDeployClick(index); }}
                            >
                              <GetApp
                                className={
                                  `${classes.tableActionButtonIcon} ${classes.edit}`
                                }
                              />
                            </IconButton>
                          </Fade>
                          <IconButton
                            aria-label="Edit"
                            className={classes.tableActionButton}
                            onClick={() => { this.handleEditProfileClick(index, profiles); }}
                          >
                            <Edit
                              className={
                                `${classes.tableActionButtonIcon} ${classes.edit}`
                              }
                            />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            className={classes.tableActionButton}
                            onClick={() => { this.handleDeleteProfileClick(index); }}
                          >
                            <Close
                              className={
                                `${classes.tableActionButtonIcon} ${classes.close}`
                              }
                            />
                          </IconButton>
                        </div>
                      </Grid>
                    </CardHeader>
                    <CardBody>
                        <WidgetTable
                          profileIndex={index}
                          widgets={profile.widgets}
                          editing={profile.editing}
                        />
                    </CardBody>
                    {profile.editing ?
                      (<CardFooter>
                        <Grid
                          container
                          alignItems='flex-end'
                          direction='row'
                          justify='space-between'
                        >
                          <Fade in={profile.editing}>
                            <Button
                              color="primary"
                              disabled={widgetMax}
                              onClick={() => { this.handleAddWidgetClick(index); }}
                            >
                              <Add className={
                                `${classes.tableActionButtonIcon}`} />
                              Add Widget
                            </Button>
                          </Fade>
                          <Fade in={profile.editing}>
                            <div>
                              <Button
                                color="primary"
                                disabled={!profile.editing}
                                onClick={() => { this.handleSaveProfileClick(index); this.handleProfileNameChange(null, index); }}
                              ><Save />
                                Save Changes
                              </Button>
                              <Button
                                color="primary"
                                disabled={!profile.editing}
                                onClick={() => { this.handleCancelClick(index); }}
                              ><Close />
                                Cancel
                              </Button>
                            </div>
                          </Fade>
                        </Grid>
                      </CardFooter>)
                      : <div></div>}
                  </Card>
                  <DeleteProfileModal
                    open={profile.deleting}
                    close={this.handleDeleteModalClose}
                    confirm={this.handleDeleteModalConfirm}
                    profileName={profile.profile}
                    profileIndex={index}
                    />
                  <WidgetSelectModal
                    open={this.state.showWidgetSelectModal === index}
                    close={this.handleWidgetModalClose}
                    select={this.handleWidgetModalSelect}
                    profileIndex={index}
                    />
                </GridItem>
            );
          })}
        </Grid>
        <Grid
          container
          spacing={16}
          alignItems='center'
          direction='column'
          justify='center'
          >
          <Button
            color="primary"
            aria-label="Add"
            onClick={this.handleAddProfileClick}
            className={classes.buttonLink}
          >
            <Add className={
              `${classes.tableActionButtonIcon}`} />
            Add Profile
          </Button>
        </Grid>
      </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {pageView}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
    particle: state.particle,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return bindActionCreators({
    fetchProfilesFromDB,
    updateProfiles,
    deployProfileToDevice,
    saveProfileToDB,
    deleteProfileFromDB,
  }, dispatch);
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchtoProps),
)(DeviceProfiles);
