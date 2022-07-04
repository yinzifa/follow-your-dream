const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    resolve: {
        alias: {
            "pages": path.resolve(__dirname,'src/pages/')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: "index.html",
            template: path.resolve(__dirname, 'public','index.html'),
        }),
        new VueLoaderPlugin()
    ]
};

