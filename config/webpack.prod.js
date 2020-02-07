const merge = require("webpack-merge");
const path = require("path");
const base = require("./webpack.dev");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "[name]_[hash].min.js"
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 1200000,
    maxAssetSize: 1200000
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
});
