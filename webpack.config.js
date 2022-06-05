const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

const copyPluginConfig = new CopyPlugin({
  patterns: [
    { from: "data", to: "assets" },
    // relative path is from src
    {from: './static/favicon.ico' }, 
  ],
});

const config = {
  entry: {
    ipaJfk: './src/IpaJfk.jsx',
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './ipa-jfk.html'
    }),
    copyPluginConfig,
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    return {
      ...config, 
      mode: 'production',
      plugins: [
        new HtmlWebpackPlugin({
          template: './ipa-jfk-prod.html'
        }),
        copyPluginConfig,
      ],
      // reduce generated file sizes
      devtool: false,
      performance: {
        hints: false,
      },
      optimization: {
        splitChunks: {
          minSize: 10000,
          maxSize: 250000,
        }
      },
    };
  }

  // argv.mode === 'development'
  return config;
};