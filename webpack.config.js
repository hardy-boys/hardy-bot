const path = require('path');
const webpack = require('webpack');
let CompressionPlugin = require('compression-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/react-client/src');
const BUILD_DIR = path.join(__dirname, '/react-client/dist');
const ASSET_DIR = path.join(__dirname, '/react-client/dist/assets');


module.exports = {
  entry: `${SRC_DIR}/index.js`,
  mode: (process.env.NODE_ENV === 'production' ? 'production' : 'development'),
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: ASSET_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader?name=/assets/img/[name].[ext]',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0,
    }),
  ],
  resolve: {
    modules: [
      './node_modules',
      './react-client/src',
    ],
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
  },
};
