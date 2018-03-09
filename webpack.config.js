const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const entry = isDev ? {
  app: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, './example/app')
  ]
} : {
  app: path.resolve(__dirname, './example/app')
}

const plugins = isDev ? [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, './example/index.html'),
    title: 'Output Management'
  }),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
] : [
  new CleanWebpackPlugin([path.resolve(__dirname, './example/public')]),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, './example/index.html'),
    title: 'Output Management'
  }),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
  })
]

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: entry,
  resolve: {
    extensions: ['.js','.jsx','.json'],
  },
  devtool: isDev ? 'inline-source-map' : false,
  plugins: plugins,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './example/public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.jsx?$/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
    ],
  },
};
