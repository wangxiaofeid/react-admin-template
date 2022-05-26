const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require("./config");
const devMode = process.env.SYS_ENV !== "production";

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  cache: true,
  stats: "minimal",
  context: path.resolve(__dirname, "../"),
  entry: {
    app: "./src/App.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env)
    }),
    new webpack.ProvidePlugin({
      React: "react"
    })
  ],
  output: {
    path: config.build.assetsRoot,
    filename: "js/[name].[hash:8].js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": resolve("src")
    }
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "../src")],
        use: {
          loader: "babel-loader?cacheDirectory=true"
        }
      },
      {
        test: /\.css$/,
        use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.less$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modules: false,
                javascriptEnabled: true,
                modifyVars: {
                  hack: 'true; @import "~@/styles/theme.less";'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset",
        generator: {
          filename: "images/[hash][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext]"
        }
      }
    ]
  }
};
