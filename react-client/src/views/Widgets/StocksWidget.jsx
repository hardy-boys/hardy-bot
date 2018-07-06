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

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    let { stockSymbols } = this.props.stocks;
    this.props.startStocksPolling(stockSymbols);
  }

  componentWillUnmount() {
    this.props.stopStocksPolling();
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
  return { stocks: state.stocks };
};

const mapDispatchtoProps = (dispatch) => {
  return bindActionCreators({ startStocksPolling, stopStocksPolling }, dispatch);
};

export default compose(connect(mapStateToProps, mapDispatchtoProps))(StocksWidget);
