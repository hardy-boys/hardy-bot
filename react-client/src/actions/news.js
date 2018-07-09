import axios from 'axios';

import {
  START_NEWS_POLLING,
  STOP_NEWS_POLLING,
  NEWS_POLLING_STOPPED,
  NEWS_REQUEST_ERROR,
  NEWS_DATA_RECEIVED,
} from './types';

const startNewsPolling = (searchTerm) => {
  return (dispatch) => {
    dispatch({ type: START_NEWS_POLLING });
    axios.post('/api/news', { searchTerm })
      .then((res) => {
        console.log('RESPONSE', res.data);
        dispatch({ type: NEWS_DATA_RECEIVED, payload: res.data.articles });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: NEWS_REQUEST_ERROR, payload: err });
      });
  };
};

const stopNewsPolling = () => {
  return (dispatch) => {
    dispatch({ type: STOP_NEWS_POLLING });
    axios.get('/api/news/close')
      .then((res) => {
        console.log(res.data);
        dispatch({ type: NEWS_POLLING_STOPPED });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: NEWS_REQUEST_ERROR });
      });
  };
};
export {
  startNewsPolling,
  stopNewsPolling,
};
