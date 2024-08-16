const webpack = require('webpack');

module.exports = function override(config) {
  // Add fallback for process and buffer modules
  config.resolve.fallback = {
    process: require.resolve('process/browser'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/')
  };

  // Add ProvidePlugin for process and Buffer
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  );

  return config;
};
