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
import WidgetDropdown from 'views/DeviceProfiles/WidgetDropdown.jsx';
import { MoonLoader } from 'react-spinners';
import DeleteProfileModal from 'views/DeviceProfiles/DeleteProfileModal.jsx';

import { fetchProfilesFromDB } from '../../actions/profiles';

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

  componentDidMount() {
    this.props.fetchProfilesFromDB();
  }

  editWidget(widgetInfo) {
    console.log('Edit widget: ', widgetInfo);
  }

  deleteWidget(widgetInfo) {
    console.log('Delete widget: ', widgetInfo);
    let profIdx = widgetInfo.index;
    let { widget } = widgetInfo;
    let updatedProfiles = this.state.profiles;
    let widgetIdx = updatedProfiles[profIdx].widgets.indexOf(widget);
    updatedProfiles[profIdx].widgets.splice(widgetIdx, 1);

    this.setState({
      profiles: updatedProfiles,
    });
  }

  handleEditProfileClick = (profIdx) => {
    let updatedProfiles = this.state.profiles;
    updatedProfiles[profIdx].editing = true;

    this.setState({
      profiles: updatedProfiles,
    });
  }

  handleDeleteProfileClick = (profIdx) => {
    let updatedProfiles = this.state.profiles;
    updatedProfiles[profIdx].deleting = true;

    this.setState({
      profiles: updatedProfiles,
    });
  }

  handleSaveClick = (profIdx) => {
    // save to DB
    let updatedProfiles = this.state.profiles;
    updatedProfiles[profIdx].editing = false;

    this.setState({
      profiles: updatedProfiles,
    });
  }

  handleCancelClick = (profIdx) => {
    let updatedProfiles = this.state.profiles;
    updatedProfiles[profIdx].editing = false;

    this.setState({
      profiles: updatedProfiles,
    });
  }

  handleAddClick = () => {

  }

  handleModalClose = (profIdx) => {
    let updatedProfiles = this.state.profiles;
    updatedProfiles[profIdx].deleting = false;

    this.setState({
      profiles: updatedProfiles,
    });
  }

  handleModalConfirm = (profIdx) => {
    let closeModal = this.state.profiles;
    closeModal[profIdx].deleting = false;

    // make sure modal is closed before deleting profile
    this.setState({
      profiles: closeModal,
    }, () => {
      let updatedProfiles = this.state.profiles;
      updatedProfiles.splice(profIdx, 1);
      this.setState({
        profiles: updatedProfiles,
      });
    });
    // TODO: delete from database
  }

  saveChanges() {
    // TODO: save changes to database
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
                        <h4 className={classes.cardTitleWhite}>
                        {profile.profile}
                          {/* <CustomInput
                            labelText="ProfileName"
                            id="profilename"
                            formControlProps={{
                              fullWidth: false,
                            }}
                          /> */}
                        </h4>
                        <div>
                          <IconButton
                            aria-label="Edit"
                            className={classes.tableActionButton}
                            onClick={() => { this.handleEditProfileClick(index); }}
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
                          editWidget={this.editWidget.bind(this)}
                          deleteWidget={this.deleteWidget.bind(this)}
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
                            <WidgetDropdown
                            type={'add'}
                            editing={profile.editing}
                            />
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
                    close={this.handleModalClose.bind(this)}
                    confirm={this.handleModalConfirm.bind(this)}
                    profileName={profile.profile}
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
            onClick={null}
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
  return bindActionCreators({ fetchProfilesFromDB }, dispatch);
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchtoProps),
)(DeviceProfiles);
