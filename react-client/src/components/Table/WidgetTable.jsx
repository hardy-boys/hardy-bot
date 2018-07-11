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
// @material-ui/icons
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';
// core components
import tasksStyle from 'assets/jss/material-dashboard-react/components/tasksStyle.jsx';
import WidgetDropdown from 'views/DeviceProfiles/WidgetDropdown.jsx';
import Typography from '@material-ui/core/Typography';

import { updateProfiles } from '../../actions/profiles';


class WidgetTable extends React.Component {
  handleEditClicked(widgetInfo) {
    console.log('Edit widget: ', widgetInfo);
  }

  handleDeleteClicked(widgetInfo) {
    console.log('Delete widget: ', widgetInfo);
    let profIdx = widgetInfo.index;
    let { widget } = widgetInfo;
    let updatedProfiles = this.props.profiles.profileData;
    let widgetIdx = updatedProfiles[profIdx].widgets.indexOf(widget);
    updatedProfiles[profIdx].widgets.splice(widgetIdx, 1);
    this.props.updateProfiles(updatedProfiles);
  }

  render() {
    const {
      classes, widgets, profileIndex, editing,
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
                  <WidgetDropdown
                    type={'edit'}
                    editing={editing}
                  />
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
                    onClick={() => this.handleDeleteClicked({ index: profileIndex, widget })}
                  >
                    <Close
                      className={
                        `${classes.tableActionButtonIcon} ${classes.close}`
                      }
                    />
                  </IconButton>
                </Fade>
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
