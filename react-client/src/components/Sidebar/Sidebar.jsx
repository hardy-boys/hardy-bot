import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from 'components/CustomButtons/Button.jsx';
// core components
import HeaderLinks from 'components/Header/HeaderLinks.jsx';

import sidebarStyle from 'assets/jss/material-dashboard-react/components/sidebarStyle.jsx';

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1;
  }
  const {
    classes, color, logo, image, logoText, routes, logout,
  } = props;
  let links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        let activePro = ' ';
        let listItemClasses;
        if (prop.path === '/upgrade-to-pro') {
          activePro = `${classes.activePro} `;
          listItemClasses = classNames({
            [` ${classes[color]}`]: true,
          });
        } else {
          listItemClasses = classNames({
            [` ${classes[color]}`]: activeRoute(prop.path),
          });
        }
        const whiteFontClasses = classNames({
          [` ${classes.whiteFont}`]: activeRoute(prop.path),
        });
        return (
            <NavLink
              to={prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.sidebarName}
                  className={classes.itemText + whiteFontClasses}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        })}
        <Button style={{ position: 'absolute', bottom: '10px', width: '90%', margin: '12px' }} color="rose" onClick={logout}>Logout</Button>
    </List>
  );
  let brand = (
    <div className={classes.logo}>
        <div className={classes.logoImage}>
          <a href='https://github.com/hardy-boys/thesis'>
            <img src='../../assets/img/hardybotlogo.png' className={classes.img} />
          </a>
        </div>
    </div>
  );
  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(sidebarStyle)(Sidebar);
