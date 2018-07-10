import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import axios from 'axios';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
// core components
import GridItem from 'components/Grid/GridItem.jsx';

// import Table from "components/Table/Table.jsx";
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CardIcon from 'components/Card/CardIcon.jsx';
import Language from '@material-ui/icons/Language';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import WbSunny from '@material-ui/icons/WbSunny';
import GolfCourse from '@material-ui/icons/GolfCourse';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import WidgetTable from 'components/Table/WidgetTable.jsx';
import { MoonLoader } from 'react-spinners';

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
    profiles: {},
    loading: true,
  };

  componentDidMount() {
    axios.get('/profile/loadAll')
      .then((result) => {
        let { data } = result;
        this.setState({
          loading: false,
          profiles: data,
        });
      })
      .catch((err) => {
        console.log(`Error loading profiles: ${err}`);
      });
  }

  editWidget(widgetInfo) {
    console.log('Edit widget: ', widgetInfo);
  }

  deleteWidget(widgetInfo) {
    console.log('Delete widget: ', widgetInfo);
    let newProfiles = this.state.profiles;
    let { profile } = widgetInfo;
    let { widget } = widgetInfo;

    let updateProfile = this.state.profiles.find(el => el.profile === profile);
    let index = this.state.profiles.findIndex(el => el.profile === profile);
    updateProfile.widgets.splice(updateProfile.widgets.indexOf(widget), 1);
    newProfiles[index] = updateProfile;

    this.setState({
      profiles: newProfiles,
    });
  }

  saveChanges() {
    // TODO: save changes to database
  }

  render() {
    const { classes } = this.props;
    const { profiles } = this.state;
    let pageView;
    if (this.state.loading) {
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
            loading={this.state.loading}
          />
        </Grid>
      );
    } else {
      pageView = (
        <Grid container>
          {this.state.profiles.map((profile, index) => {
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
                      <h4 className={classes.cardTitleWhite}>{profile.profile}</h4>
                      <div>
                        <IconButton
                          aria-label="Edit"
                          className={classes.tableActionButton}
                          onClick={() => {}}
                        >
                          <Edit
                            className={
                              `${classes.tableActionButtonIcon} ${classes.edit}`
                            }
                          />
                        </IconButton>
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                          onClick={() => {}}
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
                      profileName={profile.profile}
                      widgets={profile.widgets}
                      editWidget={this.editWidget.bind(this)}
                      deleteWidget={this.deleteWidget.bind(this)}
                    />
                  </CardBody>
                  <CardFooter>
                    <Grid
                      container
                      alignItems='flex-end'
                      direction='row'
                      justify='center'
                    >
                      <Button color="primary">Save Changes</Button>
                    </Grid>
                  </CardFooter>
                </Card>
              </GridItem>
            );
          })}
        </Grid>
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

export default compose(withStyles(styles, connect(mapStateToProps))(DeviceProfiles));
