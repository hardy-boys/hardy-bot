/*!

 =========================================================
 * Material Dashboard React - v1.3.0 based on Material Dashboard - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

/* Nord Theme Variables */
import ns from "./nord-styles.jsx";

const drawerWidth = 260;

const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};

const container = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  background: ns.nord6
};

const boxShadow = {
  boxShadow:
    "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
};

const card = {
  display: "inline-block",
  position: "relative",
  width: "100%",
  margin: "25px 0",
  boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
  borderRadius: "3px",
  color: "rgba(0, 0, 0, 0.87)",
  background: "#fff"
};

const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: "300",
  lineHeight: "1.5em"
};

const primaryColor = ns.nord3;
const warningColor = ns.nord12;
const dangerColor = ns.nord11;
const successColor = ns.nord14;
const infoColor = ns.nord8;
const roseColor = "#e91e63";
const grayColor = ns.nord4;

const primaryBoxShadow = {
  boxShadow:
    `0 12px 20px -10px ${ns.nord3}, 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px ${ns.nord3}`
};
const infoBoxShadow = {
  boxShadow:
    `0 12px 20px -10px ${ns.nord8}, 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px ${ns.nord8}`
};
const successBoxShadow = {
  boxShadow:
    `0 12px 20px -10px ${ns.nord14}, 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px ${ns.nord14}`
};
const warningBoxShadow = {
  boxShadow:
    `0 12px 20px -10px ${ns.nord12}, 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px ${ns.nord12}`
};
const dangerBoxShadow = {
  boxShadow:
    `0 12px 20px -10px ${ns.nord11}, 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px ${ns.nord11}`
};
const roseBoxShadow = {
  boxShadow:
    `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)`
};

const warningCardHeader = {
  background: `linear-gradient(60deg, ${ns.nord12}, ${ns.nord12})`,
  ...warningBoxShadow
};
const successCardHeader = {
  background: `linear-gradient(60deg, ${ns.nord14}, ${ns.nord14})`,
  ...successBoxShadow
};
const dangerCardHeader = {
  background: `linear-gradient(60deg, ${ns.nord11}, ${ns.nord11})`,
  ...dangerBoxShadow
};
const infoCardHeader = {
  background: `linear-gradient(60deg, ${ns.nord8}, ${ns.nord8})`,
  ...infoBoxShadow
};
const primaryCardHeader = {
  background: `linear-gradient(60deg, ${ns.nord3}, ${ns.nord3})`,
  ...primaryBoxShadow
};
const roseCardHeader = {
  background: `linear-gradient(60deg, #ec407a, #d81b60)`,
  ...roseBoxShadow
};

const cardActions = {
  margin: "0 20px 10px",
  paddingTop: "10px",
  borderTop: "1px solid #eeeeee",
  height: "auto",
  ...defaultFont
};

const cardHeader = {
  margin: "-20px 15px 0",
  borderRadius: "3px",
  padding: "15px"
};

const defaultBoxShadow = {
  border: "0",
  borderRadius: "3px",
  boxShadow:
    "0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  padding: "10px 0",
  transition: "all 150ms ease 0s"
};

const title = {
  color: "#3C4858",
  textDecoration: "none",
  fontWeight: "300",
  marginTop: "30px",
  marginBottom: "25px",
  minHeight: "32px",
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  "& small": {
    color: "#777",
    fontSize: "65%",
    fontWeight: "400",
    lineHeight: "1"
  }
};

const cardTitle = {
  ...title,
  marginTop: "0",
  marginBottom: "3px",
  minHeight: "auto",
  "& a": {
    ...title,
    marginTop: ".625rem",
    marginBottom: "0.75rem",
    minHeight: "auto"
  }
};

const cardSubtitle = {
  marginTop: "-.375rem"
};

const cardLink = {
  "& + $cardLink": {
    marginLeft: "1.25rem"
  }
};

export {
  //variables
  drawerWidth,
  transition,
  container,
  boxShadow,
  card,
  defaultFont,
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  roseBoxShadow,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  cardActions,
  cardHeader,
  defaultBoxShadow,
  title,
  cardTitle,
  cardSubtitle,
  cardLink
};
