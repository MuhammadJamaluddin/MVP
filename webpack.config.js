const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/app.jsx'),
  module: {
    rules: [
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public/js'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
