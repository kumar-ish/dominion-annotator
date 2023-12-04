const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  return {
    // Mode is forced to production because chrome does not allow unsafe-eval in extensions.
    mode: "production",
    entry: {
      content: path.resolve(__dirname, "..", "src", "scripts", "content.ts"),
      popup: path.resolve(__dirname, "..", "src", "popup", "popup.ts"),
    },
    output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].bundle.js",
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".js", ".css", ".scss"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            // Creates `style` nodes from JS strings
            // Fallback to style-loader in development
            /*
             */
            !env.production ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                sassOptions: {
                  outputStyle: "compressed",
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: ".", to: ".", context: "public" },
          { from: "src/cards.json", to: "." },
        ],
      }),
      // Generate popup page
      new HtmlWebpackPlugin({
        filename: "popup.html",
        template: "src/popup/index.html",
        chunks: ["popup"],
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
  };
};
