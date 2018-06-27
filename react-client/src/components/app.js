import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import { exampleAction } from '../actions/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Typography variant='display4' gutterBottom> Hello World!</Typography>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  examplePropOne: state.examplePropOne,
  examplePropTwo: state.examplePropTwo,
});

const mapDispatchToProps = dispatch => bindActionCreators({ exampleAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
