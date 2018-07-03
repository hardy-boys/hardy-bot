import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

class WeatherWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.fetched) {
      const { temp, humidity, pressure } = this.props.weather.weatherData.main;
      const { wind } = this.props.weather.weatherData;
      return (
      <div style={{
width: '550px', opacity: '.75', float: 'right', backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/back_pic/03/71/82/5157b849c6299b1.jpg")',
}}>
          <div style={{
width: '50%', float: 'left', minHeight: '150px', position: 'relative',
}}>
          <span style={{ position: 'absolute', bottom: '0' }}><h1 style={{ color: 'white', fontSize: '72px', margin: '10px' }}><strong>86°</strong></h1></span>
          </div>
          <div style={{ width: '50%', float: 'right' }}>
            <div style={{
textAlign: 'right', padding: '10px', color: 'white', fontSize: '36px',
}}>AUSTIN, TX</div>
            <div style={{ textAlign: 'right', minHeight: '106px', padding: '0px 10px' }}>
                <p style={{ margin: '0px', color: 'white' }}>HUMIDITY: <strong>{humidity}</strong></p>
                <p style={{ margin: '0px', color: 'white' }}>WIND: <strong>10MPH E</strong></p>
            </div>
          </div>
          <div style={{
width: '100%', display: 'table', tableLayout: 'fixed', minHeight: '50px',
}}>
            <div style={{ display: 'table-cell', textAlign: 'center', color: 'white' }}>
                SUN
                <p><strong>87°</strong></p>
            </div>
            <div style={{ display: 'table-cell', textAlign: 'center', color: 'white' }}>
                MON
                <p><strong>92°</strong></p>
                </div>
            <div style={{ display: 'table-cell', textAlign: 'center', color: 'white' }}>
                TUE
                <p><strong>93°</strong></p>
                </div>
            <div style={{ display: 'table-cell', textAlign: 'center', color: 'white' }}>
                WED
                <p><strong>99°</strong></p>
                </div>
            <div style={{ display: 'table-cell', textAlign: 'center', color: 'white' }}>
                THU
                <p><strong>89°</strong></p>
                </div>
            <div style={{ display: 'table-cell', textAlign: 'center', color: 'white' }}>
                FRI
                <p><strong>92°</strong></p>
                </div>
            <div style={{ display: 'table-cell', textAlign: 'center', color: 'white' }}>
                SAT
                <p><strong>101°</strong></p>
                </div>
          </div>

      </div>
      );
    } else {
      return (
            <div> loading... </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { weather: state.weather };
};

export default compose(connect(mapStateToProps),
  // connect(null, mapDispatchToProps),
)(WeatherWidget);
