const  ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
module.exports = {
    entry: [
        './src/index.js',

    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
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
            },  {
                test: /\.sass$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    } // translates CSS into CommonJS
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    } // compiles Sass to CSS
                }]
            }]

    },
    plugins: [
        extractSass
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    }
}
