const webpack = require('webpack');

module.exports = {
  // Add or adjust your Webpack configuration
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),  // Define environment variables
      }),
    ],
  },
};