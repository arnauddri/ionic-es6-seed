 var webpack = require('webpack')
 var path = require('path')
 var autoprefixer = require('autoprefixer')
 var commonModulesPath = path.join(__dirname, 'client', 'app', 'common')
 var nodeModulesPath = path.join(__dirname, 'node_modules')
 var bowerModulesPath = path.join(__dirname, 'lib')
 var publicAssetsPath = path.join(__dirname, 'client', 'assets')

module.exports = {
  devtool: 'eval',
  entry: [
    './app/app.js'
  ],
  context: path.resolve(__dirname + '/client'),
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    )
  ],
  resolve: {
      root: [nodeModulesPath, bowerModulesPath, commonModulesPath, publicAssetsPath],

      alias: {
        common: commonModulesPath,
        assets: publicAssetsPath,
        ionic$: 'ionic/js/ionic.bundle.js'
      }
  },
  resolveLoader: {
      root: nodeModulesPath
  },
  module: {
    // placed here so we know that it is done before transpiling
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader', exclude: [/node_modules/, /lib/, /\.config\.js/, /\.conf\.js/ ] }
    ],

    loaders: [
      { test: /\.html$/, loader: 'raw' },
      { test: /\.jade$/, loader: 'jade-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!postcss-loader!less-loader' },
      { test: /\.css/, loader: 'style!css' },
      { test: /\.(png|jpg|jpeg|svg|woff2|woff|eot|eot\?#iefix|ttf|otf)(\?v=(\w*\.\w*)*)*$/, loader: 'file' },
      { test: /\.js$/, loader: 'babel?stage=1', exclude: [/lib/, /node_modules/, /\.spec\.js/] }
]
  },
  postcss: function () {
      return [autoprefixer]
  },
  eslint: {
    configFile: './.eslintrc'
  }
}

