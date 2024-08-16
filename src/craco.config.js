const webpack = require('webpack');

module.exports = {
  webpack: {
    alias: {},
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser.js',
        Buffer: ['buffer', 'Buffer']
      })
    ],
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        process: require.resolve('process/browser.js'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/')
      };
      return webpackConfig;
    }
  }
};
