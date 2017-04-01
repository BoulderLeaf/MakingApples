var path = require('path');

module.exports = {
  entry: './src/js/script.js',
  output: {
    filename: 'bundle1.js',
    path: path.resolve(__dirname, 'tmp')
  }, 
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=public/fonts/[name].[ext]'
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }, 
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};