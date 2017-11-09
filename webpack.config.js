const path = require('path');

module.exports = {
    entry: {
        app: './src/index.js',
        data: './src/data.js',
        aux: './src/htmlRendering.js'
    },
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
