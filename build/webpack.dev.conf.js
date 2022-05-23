const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.conf");
const config = require("./config");
const apiMocker = require("mocker-api");

const { IS_MOCK } = process.env;

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  output: {
    filename: "js/[name].js",
    chunkFilename: "js/[name].js",
    publicPath: config.dev.assetsPublicPath
    // publicPath: config.build.assetsPublicPath,
  },
  devServer: {
    host: config.dev.host,
    port: config.dev.port,
    static: [
      path.join(__dirname, "../dist"),
      path.join(__dirname, "../public"),
      path.join(__dirname, "../static")
    ],
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable || {},
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      const { app } = devServer;

      IS_MOCK && apiMocker(app, path.resolve("./mocker/index.js"));
    },
    hot: true,
    historyApiFallback: {
      rewrites: [
        {
          from: /!^\/api/g,
          to: "/"
        }
      ]
    }
    // disableHostCheck: true
  },
  devtool: config.dev.devtool,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.html"),
      inject: true,
      hunksSortMode: "none"
    })
  ],
  optimization: {
    minimize: false
  }
});
