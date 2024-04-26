import type { Config } from 'tailwindcss'

import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'

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
        background: 'color-mix(in srgb, var(--s94-ui-background) calc(<alpha-value> * 100%), transparent)',
        current: 'currentColor',
        // once Firefox supports https://caniuse.com/css-relative-colors we should use the following:
        // foreground: 'rgb(from var(--s94-ui-foreground) r g b / <alpha-value>)',
        foreground: 'color-mix(in srgb, var(--s94-ui-foreground) calc(<alpha-value> * 100%), transparent)',
        info: colors.sky,
        success: colors.green,
        transparent: 'transparent',
        warning: colors.red,
      },
      fontFamily: {
        sans: ['DM Sans'],
        mono: ['Fira Code'],
      },
    },
  },
}
