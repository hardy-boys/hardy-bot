import React from 'react';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
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

import dropdownStyle from 'assets/jss/material-dashboard-react/dropdownStyle.jsx';
import tasksStyle from 'assets/jss/material-dashboard-react/components/tasksStyle.jsx';
import Button from 'components/CustomButtons/Button.jsx';

let widgetNames = ['DateTimeWeatherWidget', 'StocksWidget', 'NewsWidget', 'TrafficWidget', 'SportsWidget'];


class WidgetDropdown extends React.Component {
  state = {
    open: false,
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    const { editing } = this.props;
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
          disabled={!editing}
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
                          onClick={this.handleClose}
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

export default withStyles(tasksStyle, dropdownStyle)(WidgetDropdown);
