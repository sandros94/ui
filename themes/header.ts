import type { TV } from 'tailwind-variants'

export default {
  slots: {
    root: 'w-full bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px text-xl',
    container: 'flex items-center justify-between gap-3 h-[--header-height] max-w-[90rem]',
    left: 'lg:flex-1 flex items-center gap-1.5 text-2xl truncate',
    center: 'hidden lg:flex text-lg',
    right: 'flex items-center justify-end lg:flex-1 gap-2',
    logo: 'flex-shrink-0 font-bold text-gray-900 dark:text-white flex items-end gap-1.5 break-keep',
    mobileButton: 'lg:hidden',
    slideoverBg: 'bg-background dark:bg-background',
    slideoverOverlayBg: 'bg-background/75 dark:bg-background/75',
    panelRoot: '',
    panelHeader: 'w-full h-[--header-height] inline-flex items-center justify-between border-b border-gray-200 dark:border-gray-800 text-2xl',
    panelBase: '',
    panelContent: 'max-w-full w-full h-full pt-[--header-height] m-auto text-xl items-center',
    panelLinks: 'text-2xl gap-y-3 -mt-[--header-height]',
    panelFooter: 'w-fit py-8 mx-auto text-2xl',
    socials: 'w-fit',
  },
  variants: {
    variant: {
      faded: {
        root: 'border-0 bg-background/0 backdrop-blur-none bg-gradient-to-b from-background/75 to-transparent',
      },
    },
    sticky: {
      true: {
        root: 'sticky top-0 z-50 transition-all duration-300 ease-in-out',
      },
    },
    rtl: {
      true: {
        container: 'flex-row-reverse',
        left: 'flex-row-reverse',
        right: 'flex-row-reverse',
        panelHeader: 'flex-row-reverse',
        panelFooter: 'flex-row-reverse',
      },
    },
    hideSocials: {
      desktop: {
        socials: 'lg:hidden',
      },
      mobile: {
        socials: 'hidden lg:flex',
      },
      true: {
        socials: 'hidden',
      },
    },
  },
} satisfies Parameters<TV>[0]
