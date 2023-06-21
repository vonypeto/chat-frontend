const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js", // Update with your entry point
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    https: true,
    // other configuration options
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/build",
    publicPath: "/",
  },
  optimization: {
    minimizer: [
      new TerserPlugin(), // Minify JavaScript
      new OptimizeCssAssetsPlugin(), // Minify CSS
    ],
  },
  ignoreWarnings: [
    // Ignore warnings raised by source-map-loader.
    // some third party packages may ship miss-configured sourcemaps, that interrupts the build
    // See: https://github.com/facebook/create-react-app/discussions/11278#discussioncomment-1780169
    /**
     *
     * @param {import('webpack').WebpackError} warning
     * @returns {boolean}
     */
    function ignoreSourcemapsloaderWarnings(warning) {
      return (
        warning.module &&
        warning.module.resource.includes("node_modules") &&
        warning.details &&
        warning.details.includes("source-map-loader")
      );
    },
  ],
};
