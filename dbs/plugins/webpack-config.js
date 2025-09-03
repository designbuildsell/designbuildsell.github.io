const path = require('path');

module.exports = function (context, options) {
  return {
    name: 'custom-webpack-config',
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          fallback: {
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "url": require.resolve("url/"),
            "timers": require.resolve("timers-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/")
          }
        }
      };
    },
  };
};
