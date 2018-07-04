import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

class StocksWidget extends React.Component {
  render() {
    if (this.props.stocks.fetched) {
      let { symbol, latestPrice } = this.props.stocks.stockData.data;
      return (
        <div>
          <p> Stock: {symbol} </p>
          <p> Current Price: {latestPrice} </p>
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
