module.exports = {
  plugins: [
    require('postcss-remove-declaration')({
      remove: [
        '-ms-high-contrast',
        '-ms-high-contrast: active',
        '-ms-high-contrast: none',
        'screen and (-ms-high-contrast: active)',
        'screen and (-ms-high-contrast: none)',
        'screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none)',
        '(-ms-high-contrast: active)',
        '(-ms-high-contrast: none)',
        '(-ms-high-contrast: active) and',
        '(-ms-high-contrast: none) and',
        'and (-ms-high-contrast: active)',
        'and (-ms-high-contrast: none)',
        'ms-high-contrast',
        'ms-high-contrast: active',
        'ms-high-contrast: none'
      ]
    }),
    require('autoprefixer')({
      overrideBrowserslist: ['> 1%', 'last 2 versions']
    }),
    require('cssnano')({
      preset: ['default', {
        discardUnused: true,
        discardDuplicates: true,
        normalizeWhitespace: true
      }]
    })
  ]
}
