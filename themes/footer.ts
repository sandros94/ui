import type { TV } from 'tailwind-variants'

export default {
  slots: {
    root: 'w-full py-2 mb-8 bg-background',
    left: 'p-2 text-lg flex flex-col gap-3',
    center: 'flex items-center justify-center gap-3',
    right: '',
    container: 'py-4 mt-4 mb-14 lg:mb-20 flex flex-wrap justify-around gap-12 max-w-[90rem]',
    legal: 'py-2 flex items-center justify-center gap-3 max-w-[90rem] text-sm',
    logo: '',
    socialsClass: 'text-2xl',
  },
} satisfies Parameters<TV>[0]
