import BabelMinifyPlugin from 'babel-minify-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssnanoPlugin from '@intervolga/optimize-cssnano-plugin'

export default (env, argv) => {
  const MAIN = !!(env && env.main)
  const PROD = !!(argv.mode && argv.mode === 'production')
  if (PROD) {
    process.env.NODE_ENV = 'production'
  }

  return {
    target: MAIN ? 'electron-main' : 'electron-renderer',
    entry: MAIN ? './src/main/AppMain.ts' : './src/renderer/AppRenderer.tsx',
    output: {
      path: PROD ? `${__dirname}/dist/src/assets` : `${__dirname}/src/assets`,
      filename: MAIN ? 'main.js' : 'renderer.js'
    },
    devtool: PROD ? '' : 'source-map',
    node: {
      __dirname: false,
      __filename: false
    },
    resolve: {
      extensions: [ '*', '.js', '.jsx', '.ts', '.tsx' ]
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: PROD ? '[hash:base64]' : '[name]-[local]-[hash:base64:5]',
                url: false,
                importLoaders: 1,
                sourceMap: !(PROD)
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: PROD ? 'compressed' : 'expanded',
                sourceMap: !(PROD)
              }
            }
          ]
        }
      ]
    },
    plugins: PROD ? [
      new BabelMinifyPlugin({
        replace: {
          'replacements': [
            {
              'identifierName': 'DEBUG',
              'replacement': {
                'type': 'numericLiteral',
                'value': 0
              }
            }
          ]
        }
      }, {}),
      new MiniCssExtractPlugin({ filename: 'bundle.css' }),
      new OptimizeCssnanoPlugin()
    ] : [
      new MiniCssExtractPlugin({ filename: 'bundle.css' })
    ],
    externals: MAIN ? [] : [
      'electron'
    ]
  }
}
