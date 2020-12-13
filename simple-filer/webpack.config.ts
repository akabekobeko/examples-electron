import { Configuration } from 'webpack'

export default (env: any, argv: Configuration) => {
  const MAIN = !!(env && env.main)
  const PRELOAD = !!(env && env.preload)
  const PROD = !!(argv.mode && argv.mode === 'production')
  if (PROD) {
    process.env.NODE_ENV = 'production'
  }

  return {
    target: MAIN || PRELOAD ? 'electron-main' : 'electron-renderer',
    entry: MAIN
      ? './src/main/AppMain.ts'
      : PRELOAD
      ? './src/common/Preload.ts'
      : './src/renderer/AppRenderer.tsx',
    output: {
      path: PROD ? `${__dirname}/dist/src/assets` : `${__dirname}/src/assets`,
      filename: MAIN ? 'main.js' : PRELOAD ? 'preload.js' : 'renderer.js'
    },
    devtool: PROD ? undefined : 'inline-source-map',
    node: {
      __dirname: false,
      __filename: false
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
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
                transpileOnly: true
              }
            },
            {
              loader: 'ifdef-loader',
              options: {
                env: PROD ? 'PRODUCTION' : 'DEBUG'
              }
            }
          ]
        }
      ]
    },
    externals: MAIN || PRELOAD ? [] : ['electron']
  }
}
