const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        bundle: './src/home.js',
    },
    output: {
        path: path.resolve(__dirname, 'public')
    }
};