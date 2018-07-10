import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// @material-ui/icons
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';
// core components
import tasksStyle from 'assets/jss/material-dashboard-react/components/tasksStyle.jsx';

class WidgetTable extends React.Component {
  handleEditClicked(widgetInfo) {
    this.props.editWidget(widgetInfo);
  }

  handleDeleteClicked(widgetInfo) {
    this.props.deleteWidget(widgetInfo);
  }

  render() {
    const { classes, widgets, profileName } = this.props;
    return (
      <Table className={classes.table}>
        <TableBody>
          {widgets.map((widget, index) => (
            <TableRow key={index} className={classes.tableRow}>
              <TableCell className={classes.tableCell}>
                {widget}
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                  onClick={() => this.handleEditClicked({ profile: profileName, widget })}
                >
                  <Edit
                    className={
                      `${classes.tableActionButtonIcon} ${classes.edit}`
                    }
                  />
                </IconButton>
              </TableCell>
              <TableCell className={classes.tableActions}>
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                    onClick={() => this.handleDeleteClicked({ profile: profileName, widget })}
                  >
                    <Close
                      className={
                        `${classes.tableActionButtonIcon} ${classes.close}`
                      }
                    />
                  </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

WidgetTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
};

export default withStyles(tasksStyle)(WidgetTable);
