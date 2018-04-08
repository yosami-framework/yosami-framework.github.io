const path = require('path');
const glob = require('glob');

const entry = {};
const htmls = glob.sync(path.resolve(__dirname, 'src', '**', '*.html'));
htmls.forEach((html) => {
  const file = `.${html.replace(path.resolve(__dirname, 'src'), '')}`;
  entry[file] = file;
});

module.exports = [{
  context: path.resolve(__dirname, 'src'),
  entry:   entry,
  output:  {
    path:       __dirname,
    publicPath: '/',
    filename:   '[name].tmp',
  },
  module: {
    rules: [{
      test:    /\.html$/,
      exclude: /node_modules/,
      use:     [{
        loader:  'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      }, {
        loader: 'extract-loader',
      }, {
        loader:  'html-loader',
        options: {
          attrs:       ['img:src', 'link:href'],
          minimize:    true,
          minifyCSS:   false,
          interpolate: true,
        },
      }]
    }, {
      test:    /\.scss$/,
      exclude: /node_modules/,
      use:     [{
        loader:  'file-loader',
        options: {
          name: 'assets/css/[path][name].css',
        },
      }, {
        loader: 'extract-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
        options: {
          config: {
            path: './postcss.config.js',
          },
        },
      }, {
        loader: 'sass-loader',
      }]
    }, {
      test:    /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
      exclude: /node_modules/,
      use:     [{
        loader:  'url-loader',
        options: {
          limit: 128,
          name:  'assets/images/[hash].[ext]',
        },
      }]
    }],
  },
  devServer: {
    contentBase:  __dirname,
    port:         3001,
    watchOptions: {
      poll: 2500,
    },
  },
}];
