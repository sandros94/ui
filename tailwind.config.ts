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
        background: 'var(--ui-s94-background)',
        current: 'currentColor',
        foreground: 'var(--ui-s94-foreground)',
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
