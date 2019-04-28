module.exports = (api) => {
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          electron: '4.1'
        }
      }
    ],
    '@babel/typescript',
    '@babel/preset-react'
  ]

  if (!api.env('development')) {
    presets.push(['minify', { builtIns: false }])
  }

  return { presets }
}
