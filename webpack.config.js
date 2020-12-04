const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }
  return config;
} 

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    bundle: './js/main.js',
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: optimization(),
  devServer: {
    port: 2020,
    hot: isDev,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new SpriteLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      },
      {
        from: path.resolve(__dirname, 'src/img/bg'),
        to: path.resolve(__dirname, 'dist/img/bg')
      },
      {
        from: path.resolve(__dirname, 'src/img/content'),
        to: path.resolve(__dirname, 'dist/img/content')
      },
      {
        from: path.resolve(__dirname, 'src/fonts'),
        to: path.resolve(__dirname, 'dist/fonts')
      }
      ]
    }),
  ],
  module: {
    rules: [
    {
      test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            }
          },
          {
            loader: 'sass-loader',
          }
        ],
    },
    {
      test: /\.(png|svg|gif|jpg)$/,
      exclude: [path.resolve(__dirname, './src/img/icons')],
      use: ['file-loader']
    },
    {
      test: /\.svg$/,
      include: [path.resolve(__dirname, './src/img/icons')],
      use: [
          'svg-sprite-loader',
          'svgo-loader'
      ]
    },
    // {
    //   test: /\.(js|jsx)$/,
    //   exclude: /node_modules/,
    //   use: {
    //     loader: 'babel-loader',
    //   },
    // },
    ]
  }
}