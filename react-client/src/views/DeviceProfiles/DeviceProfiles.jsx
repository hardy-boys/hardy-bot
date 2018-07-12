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
import Add from '@material-ui/icons/Add';
// core components
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import WidgetTable from 'components/Table/WidgetTable.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import { MoonLoader } from 'react-spinners';
import DeleteProfileModal from 'views/DeviceProfiles/DeleteProfileModal.jsx';
import WidgetSelectModal from 'views/DeviceProfiles/WidgetSelectModal.jsx';

import { fetchProfilesFromDB, updateProfiles, backupProfiles } from '../../actions/profiles';

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
};

class DeviceProfiles extends React.Component {
  state = {
    showWidgetSelectModal: null,
  }
  componentDidMount() {
    this.props.fetchProfilesFromDB();
    console.log(this.props.profiles.profileData);
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

  handleSaveClick = (profIdx) => {
    let updatedProfiles = this.props.profiles.profileData;
    updatedProfiles[profIdx].editing = false;
    this.props.updateProfiles(updatedProfiles);
    // save to DB
  }

  handleCancelClick = (profIdx) => {
    // restore profile state from backup
    let updatedProfiles = this.props.profiles.profileData;
    updatedProfiles[profIdx] = JSON.parse(JSON.stringify(this.props.profiles.profileBackup[profIdx]));
    this.props.updateProfiles(updatedProfiles);
  }

  handleDeleteModalClose = (profIdx) => {
    let updatedProfiles = this.props.profiles.profileData;
    updatedProfiles[profIdx].deleting = false;
    this.props.updateProfiles(updatedProfiles);
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

  handleAddWidgetClick = (profIdx) => {
    this.setState({
      showWidgetSelectModal: profIdx,
    });
  }

  handleDeleteModalConfirm = (profIdx) => {
    let closeModal = this.props.profiles.profileData;
    closeModal[profIdx].deleting = false;
    this.props.updateProfiles(closeModal);
    // todo: make sure modal is closed before deleting profile w/ prom,i
    let updatedProfiles = this.props.profiles.profileData;
    updatedProfiles.splice(profIdx, 1);
    this.props.updateProfiles(updatedProfiles);
    // TODO: delete from database
  }

  saveChanges = () => {
    // TODO: save changes to database
  }

  handleAddProfileClick = () => {
    let updatedProfiles = this.props.profiles.profileData;
    updatedProfiles.push({
      profile: 'NewProfile',
      widgets: [],
      editing: true,
      deleting: false,
      widgetModalOpen: false,
    });
    this.props.updateProfiles(updatedProfiles);
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
                          (<CustomInput
                            onEnter
                            labelText="ProfileName"
                            id="profilename"
                            inputProps={{
                              value: profile.profile,
                              // onChange: this.enterEmail,
                              // onKeyPress: this.handleKeyPress,
                            }}
                            formControlProps={{
                              fullWidth: false,
                            }}/>
                          ) :
                          (
                          <h4 className={classes.cardTitleWhite}>
                            {profile.profile}
                          </h4>
                          )
                      }
                        <div>
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
                                onClick={() => { this.handleSaveClick(index); }}
                              ><Done />
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
  };
};

const mapDispatchtoProps = (dispatch) => {
  return bindActionCreators({ fetchProfilesFromDB, updateProfiles }, dispatch);
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchtoProps),
)(DeviceProfiles);
