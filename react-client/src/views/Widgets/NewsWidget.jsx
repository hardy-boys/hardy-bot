import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import axios from 'axios';

// @material-ui/core components

import Button from 'components/CustomButtons/Button.jsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


// components

// actions

import { startNewsPolling, stopNewsPolling } from '../../actions/news';

class NewsWidget extends React.Component {
  state = {
    open: false,
    anchorEl: null,
  };

  componentDidMount() {
    // let stocks = this.checkUserConfigs();
    let searchTerm = 'World Cup';
    this.props.startNewsPolling(searchTerm);
  }

  componentWillUnmount() {
    this.props.stopNewsPolling();
  }

  checkUserConfigs() {
  }

  render() {
    console.log('PROPS', this.props);
    // if (this.props.news.fetched) {
    return (
        <div>
          Top News:
          <List>
            <ListItem>
              <ListItemText primary="News" secondary="July 7, 2018" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="News2" secondary="July 7, 2018" />
            </ListItem>
          </List>
        </div>
    );
    // } else {
    //   return (
    //     <div>
    //       <p>Loading...</p>
    //     </div>
    //   );
    // }
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news,
    user: state.user,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return bindActionCreators({ startNewsPolling, stopNewsPolling }, dispatch);
};

export default compose(connect(mapStateToProps, mapDispatchtoProps))(NewsWidget);
