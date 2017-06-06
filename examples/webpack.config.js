module.exports = {
  entry: {
    example: "./example.jsx",
  },
  output: {
    path: "static",
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        query: {
          "presets": ["es2015", "react"]
        }
      }
    ]
  }
};
