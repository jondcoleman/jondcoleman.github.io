const path = require('path')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public/'),
    proxy: {
      '/*': {
        target: 'http://localhost:3030/',
        secure: false
      }
    }
  }
}
