import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Infinite from 'react-infinite';

// @material-ui/core components

import Button from 'components/CustomButtons/Button.jsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

// components

import NewsWidgetModal from './NewsWidgetModal';

// actions

import { startNewsPolling, stopNewsPolling } from '../../actions/news';

class NewsWidget extends React.Component {
  state = {
    open: false,
    anchorEl: null,
  };

  componentDidMount() {
    this.props.startNewsPolling(this.props.news.searchTerm);
  }

  componentWillUnmount() {
    this.props.stopNewsPolling();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleProfileClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    console.log('PROPS', this.props);
    if (this.props.news.fetched && this.props.news.articles.length) {
      let articles = this.props.news.articles;
      let { anchorEl } = this.state;
      return (
        <div>
          <h5>Top News:</h5>
          <List>
            <Infinite containerHeight={250} elementHeight={90} timeScrollStateLastsForAfterUserScrolls={1000}>
            {articles.map(article =>
              <div key= {article.title}>
                <ListItem button componernt="a" href={article.url} target="_blank">
                  <ListItemText primary={article.title} secondary={article.description} />
                </ListItem>
                <Divider />
              </div>)}
            </Infinite>
          </List>
          <Button onClick={this.handleOpen.bind(this)} color="primary">Edit Widget</Button>
          <Button onClick={this.handleClick} color="primary">Add to Profile</Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleProfileClose}
          >
            <MenuItem onClick={this.handleProfileClose}>Profile1</MenuItem>
            <MenuItem onClick={this.handleProfileClose}>Profile2</MenuItem>
            <MenuItem onClick={this.handleProfileClose}>Profile3</MenuItem>
          </Menu>
          <NewsWidgetModal open={this.state.open} close={this.handleClose.bind(this)} />
        </div>
      );
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
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
