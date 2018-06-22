import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  render() {
    return (
      <div>
        <Typography variant='display3' gutterBottom> Hello World!</Typography> 
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
