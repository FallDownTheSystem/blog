---
title: Achitecture - Blog Template
name: Architecture
description: Explaining the architecture of the blog template. Including the tech stack used, project folder structure, and dependencies.
date: '2021-07-23T00:00:00'
---

<Title :title="frontmatter.name" :description="frontmatter.description" />

Think of this document as a tour guide to the files in the project. We'll go through every relevant file and explain what it does, starting with `vite.config.js`.

## vite.config.js

[Vite](https://vitejs.dev/) is our development server and production build tool. Underneath Vite uses rollup to bundle and build for production. This file is mostly used to load various plugins.

### Vue

First of them being the Vue plugin, since we're using Vue. This is simply needed for vite to be able to compile Vue.

### PWA

[Vite Plugin PWA](https://github.com/antfu/vite-plugin-pwa) is used to:

- Generate Service Worker with Offline support
- Auto inject Web App Manifest
- Automatic reload when new content available

The automatic refresh can be changed into a prompt, see the plugin's docs for more info.

### Pages

[Vite Plugin Pages](https://github.com/hannoeru/vite-plugin-pages) gives us File system based routing for Vue 3 applications.

This plugin simply adds routes added to the `src/pages/` directory to the [vue router](https://next.router.vuejs.org/).

Here markdown (.md) pages are also parsed for their front matter meta data with a function defined in `build-time/frontmatter.js`.

The pages plugin combined with another one provides us an additional wrapper around our pages, i.e. layouts.

### Layouts

[Vite Plugin Vue Layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)

This plugin wraps our pages in another `<router-view>`, defined in the `src/layouts/` directory. The layout a page uses can be defined in a
`<route>` block or with front matter in markdown files.

### Components

[Vite Plugin Components](https://github.com/antfu/vite-plugin-components) adds auto-importing of Vue components from the `src/components/` directory. This allows us to use components without importing and registering them.

This will also generate a `components.d.ts` file, with definitions for the components. This is simply used for better IDE support with [Volar](https://github.com/johnsoncodehk/volar) in VS Code.

### Icons

[Vite Plugin Icons](https://github.com/antfu/vite-plugin-icons) adds importing SVG icons from the [iconify](https://github.com/iconify/iconify) project. You can browse all the icons on [icones.js.org](https://icones.js.org/).

This allows us to use an `<i-icon:name />` component that will be rendered as an SVG icon at build time.

### Markdown

[Vite Pluigin MD](https://github.com/antfu/vite-plugin-md) lets us use markdown as Vue components and consequently Vue in our markdown files.

We configure a few settings here, [Tailwind CSS Typography](https://github.com/tailwindlabs/tailwindcss-typography) classes for the layout of the markdown files and a wrapper component whose entire purpose is to help trigger updates when the a markdown page is mounted (i.e. when navigation happens).

For code highlighting we're using [shiki](https://shiki.matsu.io/). Shiki supports a many different themes, if you want to use something other than ones provided in the template, modify the loaded themes at the start of the `vite.config.js` file and in the markdown highlight options.

#### markdown-it

Markdown requires a markdown processor, for this we're using [markdown-it](https://github.com/markdown-it/markdown-it). We configure our markdown-it plugins here as well. You can go through the plugins in the `build-time/markdown/` directory to see what they do.

Here's a quick overview:

- Container: [Custom containers](https://github.com/markdown-it/markdown-it-container) that lets you wrap markdown with any element/vue component and specify classes for that container.
- Heading: Add classes to heading (h1, h2, etc.) elements.
- Link: Adds classes to all links and attributes to external links.
- Anchor: [Header anchors](https://github.com/valeriangalliat/markdown-it-anchor) to turn headings into permalinks. Relies on slugify to turn the heading titles into a link
- Highlight lines: Adds a highlighted line over code blocks with syntax highlighting.
- Line numbers: Adds line numbers to code blocks.
- Pre wrapper: Used for adding a little language indicator to the top right corner of the code block.

## Config files

We have quite a few config files, let's start with CSS.

### tailwind.config.js

We're using [Tailwind CSS](https://tailwindcss.com/) for our CSS. The `tailwind.config.js` file defines our design system, and it's where you'll configure colors, fonts and sizes (among other things) of the site.

In addition we're using a few Tailwind CSS plugins. Namely [Typography](https://github.com/tailwindlabs/tailwindcss-typography), since this is a blog which is pretty typography heavy. Secondly, we're using [Forms](https://github.com/tailwindlabs/tailwindcss-forms) to reset form input styles.

There's also a `firefox` variant plugin, which lets us target firefox specific styles. It is used for a custom background opacity in the header and side nav because firefox doesn't support background filter blur yet.

### postcss.config.js

Tailwind runs as a PostCSS plugin, so it's configured in `postcss.config.js`. We've also enabled [nesting](https://github.com/csstools/postcss-nesting) and we get css [importing](https://github.com/postcss/postcss-import) provided by Vite. The [autoprefixer](https://github.com/postcss/autoprefixer) plugin automatically adds vendor and browser prefixes to our CSS.

### .prettierrc

If you're using the [prettier](https://prettier.io/) formatter, you can configure it in the `.prettierrc` file. Since this is a template, feel free to modify or delete the file, if you don't need it.

### .eslintrc.json

Linting is provided by [ESLint](https://eslint.org/), which is configured to work with prettier and Vue. Same story, you can modify this file or delete it, if you don't need it.

### jsconfig.json

This file is used for better IDE support with [Volar](https://github.com/johnsoncodehk/volar). It is not required for the development or build steps in anyway, and can be removed if you don't need it.

## Publish files

Preconfigured deployment files are provided for Netlify in `netlify.toml` and GitHub pages in `.github/workfils.deploy.yml`.

## package.json

All the dependencies are defined in the `package.json` file. Feel free to modify the meta data, like name, version or add a description, etc. The scripts are explained in the README.md file.

## Bootstrapping

As with any application, the process has to start somewhere. In this case the entry point is the `index.html` file.

### index.html

The `index.html` file loads our Vue application, which is first built by Vite. The entry point for the Vue application is in the `src/main.js` file, but before then, let's go through the `index.html` file.

Besides being the entry point for the Vue application, the html file does a few things

- Sets the theme (light/dark) in the `<head>` tag, to avoid a Flash of Unstyled Content (FOUC)
- Loads Google Fonts. If you want to use fully local font files, you can remove these lines.
- Sets the background color of the site and the selection color (background and text color when you select text).

### src/main.js

In the `src/main.js` file, we import [Vue Global API](https://github.com/antfu/vue-global-api), which exposes all the Vue Composition API methods globally in the application, so we don't need to import them explicitly every time in every component where we need them.

We also import our generated routes and wrap them in the layouts we've defined.

Then instead of creating a normal Vue application, we use [Vite SSG](https://github.com/antfu/vite-ssg) to create our application. This way our pages get pre-rendered.

In Vite SSG we register our PWA service worker and [NProgress](https://ricostacruz.com/nprogress/), a little progress bar at the top of the page that runs every time a route is changed.

Vite SSG handles the vue router for us, so we pass in our router options to Vite SSG instead.

The entry point of our actual application is `src/App.vue`, which only has a `<router-view />` component.

## Definitions

For better IDE support, our auto import component plugin generates a `components.d.ts` and additionally we've created a `src/shims.d.ts` so that the IDE understand to treat markdown (.md) files as if they were Vue files. These files are only for better IDE support, and are not necessary for development or building the application.

## Folder structure

Let's go through the remaining folder structure.

### public

If you have assets that are:

- Never referenced in source code (e.g. robots.txt)
- Must retain the exact same file name (without hashing)
- or you simply don't want to have to import an asset first just to get its URL

Then you can place the asset in a special `public` directory under your project root.

In the template this folder holds the favicon and PWA icons.

### dist

This is our publish or build directory, i.e. where the built static files are placed.

### src/components

Files in this directory or any sub-directories will be automatically imported.
The three folders hold components as follows:

- structural: Components that are used in the site's layout and scaffolding. You should not remove these.
- custom: These are components that are used for markdown elements or to add some kind of functionality by wrapping content.
- icons: Custom SVG icons wrapped in Vue components. If you need an icon that's not available in the Vite Icon Plugin, then you can add them here.

The examples directory is used for the examples page, and can be removed.

### src/styles

All CSS files go here.

- code: Used for code blocks and syntax highlighting.
- fonts: Define custom fonts, if you're not loading everything from Google Fonts.
- markdown: Used for markdown elements and custom components.
- main: Imports the other css files and defines some global variables and layout styles.

Feel free to create more or modify these as needed.

### src/assets

A folder for fonts, images, and other static assets that you might need. These can be imported in the code and Vite will handle the rest (assuming it's a supported file type).

The `vuex.png` file in here is used for an example, you can delete it.

### src/store.js

Lastly we have one file left, `src/store.js`, this is simply a reactive object that can be imported in components as needed. If you have some global state that you'd like to share easily between components, you can add it here.

For more information, read the getting started guide and look at the examples page.
