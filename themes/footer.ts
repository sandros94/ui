import type { TV } from 'tailwind-variants'

export default {
  slots: {
    root: 'w-full py-2 mb-8 bg-background',
    container: 'py-4 mt-4 mb-14 lg:mb-20 flex flex-col lg:flex-row justify-around gap-12 max-w-[90rem]',
    left: 'flex-1 p-2 text-lg flex flex-col gap-3 items-center',
    socialsClass: 'text-2xl w-fit',
    center: 'flex-initial flex items-center justify-center gap-3',
    right: 'flex-1 p-2',
    legal: 'py-2 flex items-center justify-center gap-3 max-w-[90rem] text-sm',
    logo: '',
  },
} satisfies Parameters<TV>[0]
