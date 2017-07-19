const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let env = process.env.NODE_ENV || 'development';
let port = process.env.PORT || 3009;
if (env !== 'production') {
  env = 'development';
}

const _module = {
  rules: [{
    test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
    use: 'url-loader'
  }, {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1'],
        plugins: ['transform-decorators-legacy']
      }
    }
  }, {
    test: /\.sass$/,
    use: [{
      loader: 'style-loader' // creates style nodes from JS strings
    }, {
      loader: 'css-loader',
      options: {
        sourceMap: true
      } // translates CSS into CommonJS
    }, {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      } // compiles Sass to CSS
    }]
  }, { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml' },
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff' },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff' },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/octet-stream' },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' }
  ]
};

let _plugins = [
  new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: env === 'development'
  }),
  new HtmlWebpackPlugin({
    template: __dirname + '/index.html'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(env)
    }
  })
];

if (env === 'production') {
  _plugins.unshift(
    new CleanWebpackPlugin([__dirname + '/server/public/*.*'], { verbose: true, dry: false })
  );
  _plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
};

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/server/public',
    filename: 'bundle.js'
  },
  devtool: env !== 'production' ? 'source-map' : false,
  module: _module,
  plugins: _plugins,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 5005,
    proxy: {
      '/api': {
        target: `http://localhost:${port}`,
        secure: false
      }
    }
  }
}