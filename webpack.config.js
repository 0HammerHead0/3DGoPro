// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;



const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Replace 'public' with your directory
          },
        port: 8080,
        open: true,
    },

    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),

        new MiniCssExtractPlugin(),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.(glb|gltf)$/,
                use: 'file-loader',
            },
            {
                test: /\.(obj|mtl)$/,
                use: 'file-loader',
            },
            {
                test: /\.(mp3|wav)$/,
                use: 'file-loader',
            },
            {
                test: /\.(mp4)$/,
                use: 'file-loader',
            },
            {
                test: /\.(pdf)$/,
                use: 'file-loader',
            },
            {
                test: /\.(fbx)$/,
                use: 'file-loader',
            },
            {
                test: /\.(bin)$/,
                use: 'file-loader',
            },
            {
                test: /\.(glb)$/,
                use: 'file-loader',
            },
            {
                test: /\.(gltf)$/,
                use: 'file-loader',
            },
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};
