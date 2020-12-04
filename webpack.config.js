const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"), // Your input file
  output: {
    filename: "main.js", // Your output filename
    path: path.resolve(__dirname, "./public/assets"), // Output file path
    publicPath: "/assets/js", // Folder where all Webpack generated code will go
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    publicPath: "/assets/",
    contentBase: path.resolve(__dirname, "./public"),
    watchContentBase: true,
  },
};
