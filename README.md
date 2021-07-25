<p align='center'>
  <img src='https://falldownthesystem.github.io/blog/pwa-512x512.png' alt='Blog Template Logo' width='256'/>
</p>

<p align='center'>
An opinionated blog starter template - statically generated with Vite and Vue 3.
</p>

<p align='center'>
  <a href="https://falldownthesystem.github.io/blog/">Live Demo</a>
</p>

## Features

- ⚡ Built with [Vue 3](https://github.com/vuejs/vue-next) and [Vite 2](https://github.com/vitejs/vite)

- 📑 Automatic routes based on [pages](https://github.com/hannoeru/vite-plugin-pages) and [layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)

- 📦 Auto import [components](https://github.com/antfu/vite-plugin-components) and [icons](https://github.com/antfu/vite-plugin-icons)

- 📃 Use [markdown](https://github.com/antfu/vite-plugin-md) and Vue mixed together

- 🖋 Code syntax highlighting with [Shiki](https://shiki.matsu.io)

- 🎨 Styled with [Tailwind CSS](https://github.com/windicss/windicss)

- 💻 Pre-rendering pages with [Vite SSG](https://github.com/antfu/vite-ssg)

- 📱 Installable with Offline support - [PWA](https://github.com/antfu/vite-plugin-pwa)

- ☁️ Pre-configured Deployment scripts for GitHub Pages and Netlify

- 🕶 Dark theme support

## Documentation

To get started ['Use this template'](https://github.com/FallDownTheSystem/blog/generate) or fork the repository if you want to keep track of the updates on this repo.

Check out the live sample on [Netlify](https://static-blog-template.netlify.app/) or [GitHub Pages](https://falldownthesystem.github.io/blog/) for

- More information about the architecture
- A getting started guide
- Examples page

## Developers

`npm install` to install the dependencies.

`npm run dev` to start a development server (with Vite).

`npm run build` to build a production-ready site, with server-side generated pages.

`npm run serve` to run the built site locally.

The choice is package manager is optional, [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.js.org/) can also be used instead of npm.

For development, the following [VS Code](https://code.visualstudio.com/) extensions are recommended, but optional:

- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) for Vue 3 language support
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) for Tailwind CSS classes auto-completion
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for formatting
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for linting
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) for SVG icon component auto-completion
- [PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss) for PostCSS syntax support

## Future ideas

- Add a fuzzy search and tag search
  - Tags already exist on route object (parsed from meta keywords)
- Add KaTex support
- Add Mermaid Diagrams support
- Add vite-plugin-remote-assets
- Better animation support
  - useMotion and useGestures

## Credits

- [Yuxi (Evan) You](https://evanyou.me/) for [Vite](https://vitejs.dev/) and [Vitepress](https://github.com/vuejs/vitepress), some of the markdown-it plugins are based on those found in Vitepress.
- [Anthony Fu](https://antfu.me/) for [Vitesse](https://github.com/antfu/vitesse) and [Slidev](https://sli.dev/), the template relies on a ton of the plugins found in Vitesse, and the whole idea for creating this site was from seeing Slidev.
- Everyone else whose libraries are used in this project ❤

## Known issues

- Can't use a later version of `@vueuse/head` than `0.5.1` until Vite SSG updates their dependency.
- Shiki version is pinned to `0.9.3` since `0.9.4` broke Vue syntax highlighting. Not fixed in `0.9.5` yet.
- group-hover animation styles aren't working in TailwindCSS version `2.2.7`. The code is there for some animations, but they won't work until the issue is fixed and the dependency updated.
