# Welcome to `@sandros94/ui`
This project aims to be a Nuxt Layer as a starting point for my personal projects, but also a place to learn a lot about component's logic. So if you are after a stable, reliable, Nuxt Layer that provides amazing components and UI, please head over to [Nuxt UI Pro](https://ui.nuxt.com/pro) instead.
**Expect bugs and potentially breaking changes**.

## How to use it

### Install

To install this layer you have three options: via npm, via Nuxt's Github extends and manually.

#### ~~Install via npm~~ (once and if I publish it)
1. ~~Use your preferred package manager:~~
    ```bash
    npm install @sandros94/ui
    yarn install @sandros94/ui
    pnpm install @sandros94/ui
    bun install @sandros94/ui
    ```
2. and then extend you project in your `nuxt.config.ts`:
    ```ts
    export default defineNuxtConfig({
      extends: ['@sandros94/ui'],
    })
    ```

#### Directly via the extend config

1. Firstly install dependencies (or change the icon packs to your liking):
    ```bash
    npm i @nuxt/ui @nuxt/fonts @iconify/json
    yarn i @nuxt/ui @nuxt/fonts @iconify/json
    pnpm i @nuxt/ui @nuxt/fonts @iconify/json
    bun i @nuxt/ui @nuxt/fonts @iconify/json
    ```
2. Use the [Github Extend feature built into Nuxt](https://nuxt.com/docs/guide/going-further/layers#git-repository):
    ```ts
    export default defineNuxtConfig({
      extends: ['github:sandros94/ui'],
      modules: ['@nuxt/ui', '@nuxt/fonts'],
    })
    ```

#### Install Manually

1. Install deps as described in the last example.
2. Copy the `@sandros94/ui` source code (minus the `[playground](/playground/)` folder) and place it in your project, for example in `~/layers/s94-ui/` folder, then extend it from your `nuxt.config.ts`:
    ```ts
    export default defineNuxtConfig({
      extends: ['./layers/s94-ui'],
      modules: ['@nuxt/ui', '@nuxt/fonts'],
    })
    ```

### Customizing the components

Much like `@nuxt/ui` each component has a `:ui` prop to pass a typed object with the ability to customize them:
```vue
example goes here, once I have time...
```

Or you could edit them globally via `app.config.ts`
under the `s94Ui` object:
```ts
export default defineAppConfig({
  s94Ui: {
    header: {
      height: '6rem'
    },
    light: {
      background: '#fafafa',
      foreground: '#000000'
    },
    dark: {
      background: '#090909',
      foreground: '#fafafa'
    },
    // other s94Ui components here
  }
})
```

### Manually importing

There is a quick alias available as `#s94-ui`:
```ts
import type { HeaderUi } from '#s94-ui/types'
```

### Docs

There are none at the moment.
Please refer to each of the component's source code to see their props and slots.

## What it contains

The layer is based on the [@nuxt/ui](https://github.com/nuxt/ui) module, thus also on [Tailwind CSS](https://tailwindcss.com) and [headless UI](https://headlessui.com/).

### Currently available and planned

- **Elements**
  - [x] [SDarkMode](/components/elements/DarkMode.vue)
  - [x] [SLinks](/components/elements/Links.vue)
  - [x] [SLinksGroup](/components/elements/LinksGroup.vue)
  - [ ] SLinksTree
- **Layouts**
  - [x] [SCard](/components/layout/Card.vue)
  - [x] [SHeader](/components/layout/Header.vue)
  - [x] [SMain](/components/layout/Main.vue)
  - [x] [SFooter](/components/layout/Footer.vue)
  - [ ] SLanding
  - [ ] SPage
  - [ ] SAside
- **Units**
  - [x] [SHero](/components/units/Hero.vue) **IMPORTANT!** Breaking change incoming!
  - [ ] SCookie
  - [ ] SLogin

### Structure

Currently it is structured with three main types of components: **Elements**, **Layouts** and **Units**.

- **Elements** are mostly components like those you find in the [`@nuxt/ui` module](https://ui.nuxt.com).
  I treat them as the smallest part of my code that needs to be reused in other bigger components.
- **Layouts** are the visual structure of the UI, the ones that are responsible for dictating where the other components should be.
  Since these are more like cages they mostly do not include other components, with the exeptions of those components that are typical one-of in a project and have a correlation with other Layout components like `SHeader` and `SFooter`.
- **Units** are those elements that visually define a single section or block within a page, like a Hero element in a landing page or the Cookie/Login window.

### Default Icons used

- [Phosphor](https://icones.js.org/collection/ph)
- [Simple Icons](https://icones.js.org/collection/simple-icons)

## Goals

The two main goals of this project are to provide a starting point with opinionated styling for most of my projects and learn as much as possible about reusable components and Nuxt Layers. So I'm always happy to see new potential usecases outside of my own.

### Learning Concepts
- AppConfig
- Component's Emits
- Component's Props
- Component's Slots
- Default Values
- Dynamic Components
- Dynamic Icons
- Plugins

## Final Notes

**Expect breaking changes.**
Because, as much as I would like this project to get some popularity, one of the main goals is to learn, but to do it you have to do mistakes and fix them.
This is actually the main reason I'm making this repo public, so that people could come and point out the garbage I code 😁.

### Credits

- [Nuxt UI](https://github.com/nuxt/ui): this project wouldn't exists otherwise.
- [Nuxt UI Pro](https://ui.nuxt.com/pro) & [Tailwind UI](https://tailwindui.com/): as a point of reference to aim at.
- [Anu](https://github.com/jd-solanki/anu): always inspiring me to start my own custom layer based on a ui library.

## Contribute

Fork the repo, install deps and start developing.
There is an available playground folder to visually experiment with newly created components.

```bash
# pnpm
pnpm install --frozen-lockfile && pnpm run dev
```
