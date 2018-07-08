import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import axios from 'axios';

// @material-ui/core components

import Button from 'components/CustomButtons/Button.jsx';
import Table from 'components/Table/Table.jsx';

// components

import StocksWidgetModal from './StocksWidgetModal';

// actions

import { startStocksPolling, stopStocksPolling } from '../../actions/stocks';

class StocksWidget extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    let stocks = this.checkUserConfigs();
    this.props.startStocksPolling(stocks);
  }

  componentWillUnmount() {
    this.props.stopStocksPolling();
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  checkUserConfigs() {
    let { widgetName } = this.props.stocks;
    let { configurations } = this.props.user;
    let stockSymbols;

    if (configurations.length) {
      configurations.forEach((config) => {
        if (config['widget.name'] === widgetName) {
          stockSymbols = config.configuration.stocks;
        }
      });
    } else {
      stockSymbols = this.props.stocks.stockSymbols;
    }
    return stockSymbols;
  }

  render() {
    let stockBatch = this.props.stocks.stocksData;
    let stockSymbols = Object.keys(stockBatch);
    let stockData = [];
    stockSymbols.forEach((symbol, index) => {
      if (Object.prototype.hasOwnProperty.call(stockBatch, symbol)) {
        let stockArr = [symbol];
        const { latestPrice, change } = stockBatch[symbol].quote;
        stockArr.push(`$ ${latestPrice}`, `${change}`);
        stockData.push(stockArr);
      }
    });

    if (this.props.stocks.fetched) {
      return (
        <div>
          <Table
            tableHeaderColor="primary"
            tableHead={['Symbol', 'Price', 'Change', 'Price Chart']}
            tableData={stockData}
          />
          <Button onClick={this.handleOpen.bind(this)} color="primary">Edit Widget</Button>
          <StocksWidgetModal open={this.state.open} close={this.handleClose.bind(this)}/>
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
    stocks: state.stocks,
    user: state.user,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return bindActionCreators({ startStocksPolling, stopStocksPolling }, dispatch);
};

export default compose(connect(mapStateToProps, mapDispatchtoProps))(StocksWidget);
