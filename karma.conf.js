var webpackConfig = require("./webpack.development");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["mocha", "chai", "sinon"],
    files: ["test/*.ts"],
    exclude: [],
    preprocessors: {
      "test/**/*.ts": ["webpack"],
    },
    webpack: {
      mode: webpackConfig.mode,
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
    },
    reporters: ["junit", "mocha"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["jsdom"],
    singleRun: false,
    concurrency: Infinity,
  });
};
