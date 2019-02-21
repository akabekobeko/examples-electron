module.exports = (api) => {
  const presetEnv = [
    '@babel/preset-env',
    {
      targets: {
        electron: '4.0'
      }
    }
  ]

  return {
    presets: api.env('development')
      ? [presetEnv, '@babel/typescript', '@babel/preset-react', 'power-assert']
      : [presetEnv, '@babel/typescript', '@babel/preset-react', 'minify']
  }
}
