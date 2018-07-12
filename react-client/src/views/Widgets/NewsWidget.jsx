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

// components

import NewsWidgetModal from './NewsWidgetModal';
import ProfilesModal from './ProfilesModal';

// actions

import { startNewsPolling, stopNewsPolling } from '../../actions/news';

class NewsWidget extends React.Component {
  state = {
    openEditModal: false,
    openProfileModal: false,
  };

  componentDidMount() {
    this.props.startNewsPolling(this.props.news.searchTerm);
  }

  componentWillUnmount() {
    this.props.stopNewsPolling();
  }

  handleEditOpen = () => {
    this.setState({ openEditModal: true });
  };

  handleEditClose = () => {
    this.setState({ openEditModal: false });
  };

  handleOpenProfile = () => {
    this.setState({ openProfileModal: true });
  };

  handleProfileClose = () => {
    this.setState({ openProfileModal: false });
  };

  render() {
    // console.log('PROPS', this.props);
    if (this.props.news.fetched && this.props.news.articles.length) {
      let { articles } = this.props.news;
      return (
        <div>
          <h5>Top Articles:</h5>
          <List>
            <Infinite
            containerHeight={250}
            elementHeight={90}
            timeScrollStateLastsForAfterUserScrolls={500}
            >
            {articles.map((article, index) =>
              <div key={index}>
                <ListItem button component="a" href={article.url} target="_blank">
                  <ListItemText primary={article.title} secondary={article.description} />
                </ListItem>
                <Divider />
              </div>)}
            </Infinite>
          </List>
          <Button onClick={this.handleEditOpen.bind(this)} color="primary">Edit Widget</Button>
          <Button onClick={this.handleOpenProfile.bind(this)} color="primary">Add to Profile</Button>
          <NewsWidgetModal
            open={this.state.openEditModal}
            close={this.handleEditClose.bind(this)}
          />
          <ProfilesModal
            open={this.state.openProfileModal}
            close={this.handleProfileClose.bind(this)}
            widgetName={this.props.news.widgetName}
          />
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
