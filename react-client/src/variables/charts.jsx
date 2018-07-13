// ##############################
// // // javascript library for creating charts
// #############################
let Chartist = require('chartist');

// ##############################
// // // variables used to create animation on charts
// #############################

let delays = 80;
let durations = 500;
let delays2 = 80;
let durations2 = 500;

// ##############################
// // // Signal Strength
// #############################

const fakeNetworkData = {
  '2018-07-12': {
    '0-4': -55,
    '4-9': -60,
    '8-12': -65,
    '12 - 16': -54,
    '16 - 20': -62,
    '20 - 00': -70,
  },
  '2018-07-11': {
    '0-4': -55,
    '4-9': -60,
    '8-12': -65,
    '12 - 16': -54,
    '16 - 20': -62,
    '20 - 00': -70,
  },
};

const hourlyNetworkChart = {
  data: {
    labels: ['0-4', '4-8', '8-12', '12-16', '16-20', '20-00'],
    series: [[55, 70, 63, 54, 50, 70]],
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 30,
    high: 100,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  // for animation
  animation: {
    draw(data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === 'point') {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    },
  },
};

// ##############################
// // // Uptime Chart
// #############################

const uptimeChart = {
  data: {
    labels: [
      '07-01',
      '07-02',
      '07-03',
      '07-04',
      '07-05',
      '07-06',
      '07-07',
      '07-08',
      '07-09',
      '07-10',
      '07-11',
      '07-12',
    ],
    series: [[215, 842, 391, 612, 553, 793, 837, 208, 910, 1124, 981, 1429]],
  },
  options: {
    axisX: {
      showGrid: false,
    },
    low: 0,
    high: 1500,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0,
    },
  },
  responsiveOptions: [
    [
      'screen and (max-width: 640px)',
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc(value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw(data) {
      if (data.type === 'bar') {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    },
  },
};

module.exports = {
  hourlyNetworkChart,
  uptimeChart,
};
