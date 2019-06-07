const webpack = require("webpack");
const ExtractTextPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const path = require("path");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const devtool = devMode ? "cheap-module-eval-source-map" : "none";

const plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(mode)
  }),
  new HtmlWebpackPlugin({
    inject: "body",
    hash: true,
    template: "./src/index.html",
    filename: "index.html"
  })
];

const postcssLoaderPlugins = devMode
  ? [autoprefixer]
  : [autoprefixer, cssnano({ preset: ["default", { normalizeUrl: false }] })];

const config = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    sourceMapFilename: "[name].[hash].js",
    publicPath: "/"
  },
  mode,
  devtool,
  plugins,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.s?css$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: devMode ? "style-loader" : ExtractTextPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: devMode,
              modules: true,
              importLoaders: 2,
              localIdentName: "[local]__[hash:base:64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              indent: "postcss",
              plugins: postcssLoaderPlugins
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(eot|otf|woff|woff2\tff)$/,
        exclude: /(node_modules"bower_components)/,
        loader: "url-loader",
        options: {
          limit: 50000,
          prefix: "font",
          name: "[hash]:[ext]",
          outputPath: "assets/fonts/"
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        exclude: /(node_modules|bower_components)/,
        loader: "url-loader",
        options: {
          limit: 50000,
          prefix: "image",
          name: "[hash]:[ext]",
          outputPath: "assets/images/"
        }
      },
      {
        test: /\.svg$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: "bable-loader" },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
