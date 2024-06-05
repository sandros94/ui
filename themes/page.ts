import type { TV } from 'tailwind-variants'

export default {
  slots: {
    root: 'min-h-svh flex flex-col overflow-x-hidden',
    header: 'h-[--header-height] flex-none',
    wrapper: ' grow flex flex-col lg:flex-row',
    asides: 'flex-none max-lg:w-full lg:w-72',
    left: 'text-let',
    right: 'text-right',
    container: 'grow max-lg:order-last flex flex-col',
    top: 'flex-none',
    base: 'grow',
    bottom: 'flex-none',
    footer: 'flex-none',
  },
} satisfies Parameters<TV>[0]
