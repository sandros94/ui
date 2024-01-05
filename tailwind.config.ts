import type { Config } from 'tailwindcss'

import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'

// source: https://github.com/tailwindlabs/tailwindcss/issues/9143#issuecomment-1878889257
const colorMixAlphaValueWithCustomProperty = customPropertyName => `color-mix(
  in srgb,
  var(${customPropertyName}),
  transparent calc(100% - 100% * <alpha-value>)
)`

export default <Partial<Config>>{
  plugins: [typography],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(transparent|current|alert|background|foreground|info|success|warning)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        alert: colors.yellow,
        // once Firefox supports https://caniuse.com/css-relative-colors we should use the following:
        // background: 'rgb(from var(--s94-ui-background) r g b / <alpha-value>)',
        background: colorMixAlphaValueWithCustomProperty('--s94-ui-background'),
        current: 'currentColor',
        // once Firefox supports https://caniuse.com/css-relative-colors we should use the following:
        // foreground: 'rgb(from var(--s94-ui-foreground) r g b / <alpha-value>)',
        foreground: colorMixAlphaValueWithCustomProperty('--s94-ui-foreground'),
        info: colors.sky,
        success: colors.green,
        transparent: 'transparent',
        warning: colors.red,
      },
      fontFamily: {
        sans: ['DM Sans', 'DM Mono'],
      },
    },
  },
}
