import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  rules: {
    'vue/block-order': ['error', {
      'order': [['template', 'script'], 'style']
    }]
  }
}, ...compat.config({
  plugins: ['tailwindcss'],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/migration-from-tailwind-2': 'off',
  },
}))
