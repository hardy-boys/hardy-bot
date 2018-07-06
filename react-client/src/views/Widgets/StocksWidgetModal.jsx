import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import { fetchStocks, addNewStock, stopStocksPolling } from '../../actions/stocks';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class StocksWidgetModal extends React.Component {
  state = {
    symbol: '',
  };

  onInputChange(event) {
    this.setState({
      symbol: event.target.value,
    });
  }

  onSubmit() {
    this.props.addNewStock(this.state.symbol);
    this.props.fetchStocks([...this.props.stocks.stockSymbols, this.state.symbol]);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.close}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Enter New Stock
            </Typography><br />
            <Typography variant="subheading" id="simple-modal-description">
              Symbol: <input
                type="text"
                onChange={this.onInputChange.bind(this)}
                value={this.state.symbol}
              ></input>
              <Button onClick={() => { this.onSubmit(); this.props.close(); }} type="submit">Submit</Button>
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

StocksWidgetModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { stocks: state.stocks };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchStocks, addNewStock, stopStocksPolling }, dispatch);
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(StocksWidgetModal);
