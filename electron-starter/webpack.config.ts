import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'
import { Configuration } from 'webpack'

export default (env: any, argv: Configuration) => {
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
      filename: MAIN ? 'main.js' : 'renderer.js',
    },
    devtool: PROD ? '' : 'inline-source-map',
    node: {
      __dirname: false,
      __filename: false,
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
            {
              loader: 'ifdef-loader',
              options: {
                env: PROD ? 'PRODUCTION' : 'DEBUG',
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: PROD
                    ? '[hash:base64]'
                    : '[name]-[local]-[hash:base64:5]',
                },
                url: false,
                importLoaders: 1,
                sourceMap: !PROD,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !PROD,
                sassOptions: {
                  outputStyle: PROD ? 'compressed' : 'expanded',
                },
              },
            },
          ],
        },
      ],
    },
    plugins: PROD
      ? [
          new MiniCssExtractPlugin({ filename: 'bundle.css' }),
          new OptimizeCssAssetsWebpackPlugin(),
        ]
      : [new MiniCssExtractPlugin({ filename: 'bundle.css' })],
    externals: MAIN ? [] : ['electron'],
  }
}
