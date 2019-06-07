const commonConfig = require("./webpack.common");
// const path = require("path");

const devServer = {
  inline: true,
  // contentBase: path.join(__dirname, "public"),
  port: 3100,
  historyApiFallback: true
};

const config = {
  ...commonConfig,
  devServer
};

module.exports = config;
