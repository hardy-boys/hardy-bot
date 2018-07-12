import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';
// core components
import tasksStyle from 'assets/jss/material-dashboard-react/components/tasksStyle.jsx';
import WidgetSelectModal from 'views/DeviceProfiles/WidgetSelectModal.jsx';


import { updateProfiles } from '../../actions/profiles';


class WidgetTable extends React.Component {
  state = {
    showWidgetSelectModal: null,
  }

  handleEditClicked(widgetIdx) {
    console.log('Edit widget: ', widgetIdx);
    this.setState({
      showWidgetSelectModal: widgetIdx,
    });
  }

  handleDeleteClicked(widget) {
    console.log('Delete widget: ', widget);
    let { profileIndex } = this.props;
    let updatedProfiles = this.props.profiles.profileData;
    let widgetIdx = updatedProfiles[profileIndex].widgets.indexOf(widget);
    updatedProfiles[profileIndex].widgets.splice(widgetIdx, 1);
    this.props.updateProfiles(updatedProfiles);
  }

  handleWidgetModalClose = () => {
    this.setState({
      showWidgetSelectModal: null,
    });
  }

  handleWidgetModalSelect = (widget, profIdx, widgetIdx) => {
    this.setState({
      showWidgetSelectModal: null,
    });
    console.log(`Selected ${widget}`);
    let updatedProfiles = this.props.profiles.profileData;
    updatedProfiles[profIdx].widgets[widgetIdx] = widget;
    this.props.updateProfiles(updatedProfiles);
  }

  render() {
    const {
      classes, widgets, editing,
    } = this.props;
    return (
      <Table className={classes.table}>
        <TableBody>
          {widgets.map((widget, index) => (
            <TableRow key={index} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>
                <Grid
                  container
                  alignItems='flex-start'
                  direction='row'
                  justify='flex-start'
                >
                  <Fade in={editing}>
                    <IconButton
                      disabled={!editing}
                      onClick={() => { this.handleEditClicked(index); }}
                      className={classes.tableActionButton}
                    >
                      <Edit className={classes.tableActionButtonIcon} />
                    </IconButton>
                  </Fade>
                  <Typography variant="body2" gutterBottom>
                    {widget}
                  </Typography>
                </Grid>
              </TableCell>
              <TableCell className={classes.tableActions}>
                <Fade in={editing}>
                  <IconButton
                    aria-label="Close"
                    disabled={!editing}
                    className={classes.tableActionButton}
                    onClick={() => this.handleDeleteClicked({ widget })}
                  >
                    <Close
                      className={
                        `${classes.tableActionButtonIcon} ${classes.close}`
                      }
                    />
                  </IconButton>
                </Fade>
              <WidgetSelectModal
                open={this.state.showWidgetSelectModal === index}
                close={this.handleWidgetModalClose}
                select={this.handleWidgetModalSelect}
                profileIndex={this.props.profileIndex}
                widgetIndex={index}
              />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return bindActionCreators({ updateProfiles }, dispatch);
};

export default compose(
  withStyles(tasksStyle),
  connect(mapStateToProps, mapDispatchtoProps),
)(WidgetTable);
