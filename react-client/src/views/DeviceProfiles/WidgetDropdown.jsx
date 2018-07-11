import React from 'react';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';
// @material-ui/icons
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';

// core components
import widgetNames from 'variables/widgetNames.js';
import dropdownStyle from 'assets/jss/material-dashboard-react/dropdownStyle.jsx';
import tasksStyle from 'assets/jss/material-dashboard-react/components/tasksStyle.jsx';
import Button from 'components/CustomButtons/Button.jsx';

import { updateProfiles } from '../../actions/profiles';

class WidgetDropdown extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    console.log(this.state.open);
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleItemChange = (widget) => {
    if (this.props.editing) {
      const { type } = this.props;

      if (type === 'edit') {
        // update current widget if dropdown is on existing element
        console.log('Update widget: ', widget);
        let { profileIndex, widgetIndex } = this.props;
        let updatedProfiles = this.props.profiles.profileData;
        updatedProfiles[profileIndex].widgets[widgetIndex] = widget;
        this.props.updateProfiles(updatedProfiles);
        this.setState({ open: false });
      } else if (type === 'add') {
        // add new widget if dropdown is add button
        console.log('Add widget: ', widget);
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { editing } = this.props;
    const { disabled } = this.props;
    const { type } = this.props;
    const { open } = this.state;

    let buttonType;
    if (type === 'add') {
      buttonType = (
        <Button
          color="primary"
          aria-label="Add"
          aria-owns={open ? 'menu-list' : null}
          aria-haspopup="true"
          disabled={disabled}
          onClick={this.handleClick}
          className={classes.buttonLink}
        >
          <Add className={
            `${classes.tableActionButtonIcon}`} />
            Add Widget
        </Button>
      );
    } else if (type === 'edit') {
      buttonType = (
        <IconButton
          aria-label="Edit"
          aria-owns={open ? 'menu-list' : null}
          aria-haspopup="true"
          disabled={!editing}
          onClick={this.handleClick}
          className={classes.tableActionButton}
        >
          <Edit className={classes.tableActionButtonIcon} />
        </IconButton>
      );
    }

    return (
      <div>
        <Manager style={{ display: 'inline-block' }}>
          <Target>
            <Fade in={editing}>
              {buttonType}
            </Fade>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={
              `${classNames({ [classes.popperClose]: !open })
              } ${
              classes.popperResponsive}`
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={open}
                id="menu-list"
                style={{ transformOrigin: '0 0 0' }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    {widgetNames.map((widget, index) => {
                      return (
                        <MenuItem
                          key={index}
                          onClick={() => { this.handleItemChange(widget); }}
                          className={classes.dropdownItem}
                        >
                          {widget}
                      </MenuItem>
                      );
                    })}
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
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
  return bindActionCreators({ updateProfiles }, dispatch);
};

export default compose(
  withStyles(tasksStyle, dropdownStyle),
  connect(mapStateToProps, mapDispatchtoProps),
)(WidgetDropdown);
