const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: {
    app: "./src/index.ts"
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].min.js"
  },
  module: {
    rules: [
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "typings-for-css-modules-loader",
            options: {
              namedexport: true,
              camelcase: true,
              modules: true
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      CANVAS_RENDERER: true,
      WEBGL_RENDERER: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "mimiko - slot :: ARGE",
      hash: true,
      minify: {
        collapseWhitespace: true
      }
    }),
    new HardSourceWebpackPlugin({
      // Either an absolute path or relative to webpack's options.context.
      cacheDirectory: "node_modules/.cache/hard-source/[confighash]",
      // Either a string of object hash function given a webpack config.
      configHash: function(webpackConfig) {
        // node-object-hash on npm can be used to build this.
        return require("node-object-hash")({ sort: false }).hash(webpackConfig);
      },
      // Either false, a string, an object, or a project hashing function.
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: ["package-lock.json", "yarn.lock"]
      },
      cachePrune: {
        // Caches younger than `maxAge` are not considered for deletion. They must
        // be at least this (default: 2 days) old in milliseconds.
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sizeThreshold: 50 * 1024 * 1024
      }
    }),
    new FileManagerPlugin({
      onEnd: {
        copy: [
          {
            source: path.resolve(__dirname, "../assets"),
            destination: path.resolve(__dirname, "../dist/assets")
          }
        ]
      }
    })
  ],
  devServer: {
    port: 9999,
    stats: "minimal"
  }
};
