import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';

// @material-ui/core components

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

// actions

import { addNewStock, fetchStocks, stopStocksPolling, saveWidgetConfig } from '../../actions/stocks';


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
    const { widgetName } = this.props.stocks;
    const stockSymbols = [...this.props.stocks.stockSymbols, this.state.symbol];
    this.props.stopStocksPolling();
    this.props.addNewStock(this.state.symbol);
    this.props.saveWidgetConfig(1, widgetName, stockSymbols);
    // need to get userID from session
    this.props.fetchStocks(stockSymbols);
  }

  render() {
    const { classes } = this.props;
    const { stockSymbols } = this.props.stocks;
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
              Remove or Add New Stocks
            </Typography><br />
            <Typography variant="subheading" id="simple-modal-description">
              <div>
                {stockSymbols.map(stock =>
                  <p key={stock}>{stock}</p>)}
              </div>
              Add Stock: <input
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
  return bindActionCreators({
    fetchStocks,
    addNewStock,
    stopStocksPolling,
    saveWidgetConfig,
  }, dispatch);
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(StocksWidgetModal);
