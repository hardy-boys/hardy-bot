import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from 'components/CustomButtons/Button.jsx';
import Table from 'components/Table/Table.jsx';
import StocksWidgetModal from './StocksWidgetModal';

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

  render() {
    // console.log('STOCK PROPS', this.props.stocks);
    let stockBatch = this.props.stocks.stocksData.data;
    let stockSymbols = Object.keys(stockBatch);
    let stockData = [];
    // console.log('STOCK BATCH', stockBatch);
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

export default compose(connect(mapStateToProps))(StocksWidget);
