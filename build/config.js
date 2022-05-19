const path = require("path");

const proxyPath = "http://10.58.17.22:8080/";

module.exports = {
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/qimingApi": {
        target: proxyPath,
        changeOrigin: true,
        secure: false
      }
      // "/static-qiming": {
      //   target: "http://127.0.0.1:8088",
      //   pathRewrite: {
      //     "^/static-qiming": ""
      //   }
      // }
    },

    host: "0.0.0.0",
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    devtool: "eval-source-map"
  },
  build: {
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/static-qiming/",
    // devtool: 'source-map',
    devtool: false
  }
};
