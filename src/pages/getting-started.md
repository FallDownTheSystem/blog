---
title: Getting started - Blog Template
name: Getting started
description: A short guide on how to customize the blog template, and host your own site.
date: '2021-07-22'
layout: default
meta:
  - name: keywords
    content: blog, template, getting started, guide
  - name: author
    content: FallDownTheSystem
---

<Title :title="frontmatter.name ?? frontmatter.title" :description="frontmatter.description" :published="frontmatter.date" />

This guide will tell you how to change all the relevant parts of the template to customize it to your needs.

## Modify name

First things first, you'll probably want to name your blog something other than "Blog Template".

I'll list the files that you need to make changes to here:

- `index.html:` Change the name in the `<title>` tag.
- `package.json`: Change the `name`, optionally add a `description` or [any other meta data](https://docs.npmjs.com/cli/v7/configuring-npm/package-json) you want.
- `vite.config.js`: in `VitePWA` change the `name` and `short_name`, as well as the icons, including the favicon unless you want to use the defaults provided by the template.
- `src/components/structural/SiteHeader.vue`: Change the URL to the GitHub repo (or remove it all together if you don't want one)
- `src/pages/index.vue`: Change the title and description of the `<Title>` component. With the `useHead` function, change the `title` and `description` meta data, or add any meta data you want.

## Add pages

Now that you have your blog name changed, let's add some pages besides the provided examples.

Any `.vue` or `.md` in the `src/pages` directory will be added to the Vue router. Typically your blog posts will be markdown files. Blog posts use the default layout, so technically they don't need it defined, but the index page for example uses the `src/layouts.home.vue` layout. In markdown pages we can set the layout with the front matter block at the top. With `.vue` files we need to use the `<route>` tag, as seen in `src/pages/index.vue`.

The index page is the home page, with the list of posts. The one other page in the directory is `[...all].vue`, this is the catch-all, a.k.a. the 404 page. The layout for the `[...all].vue` page is the `src/layouts/empty.vue`.

### Add layouts

You can add your own layouts to the `src/layouts` directory, the only requirement is that they have a `<router-view />` component where the pages will be rendered to.

### Front matter

The [front matter](https://jekyllrb.com/docs/front-matter/) must be the first thing in the file and must take the form of valid YAML set between triple-dashed lines.

This page contains the following front matter:

```yaml
---
title: Getting started - Blog Template
name: Getting started
description: A short guide on how to customize the blog template, and host your own site.
date: '2021-07-22'
layout: default
meta:
  - name: keywords
    content: blog, template, getting started, guide
  - name: author
    content: FallDownTheSystem
---
```

Some of these are for the sake of example only.

- `title`: The document title, i.e. what is shown at the title in the browser window.
- `name`: The title of your article, you can omit this if you use the same document title as the name.
- `description`: A short description of the article. This is shown in the post list on the home page, as well as optionally below the title in the post itself.
- `date`: [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date format, i.e. `2021-07-22`. Used to order the posts in the home page posts list, and optionally shown as the published date below the title.
- `layout`: The layout file used for this page. The default is `default` and can be omitted.
- `meta`: These are HTML `<head>` meta tags, and follow the formula of `name` and `content`. Use these if you want improved SEO.

## Modify styles

Most of the styles will be configured in the `tailwind.config.js` file.

### Fonts

Fonts are configured in the tailwind `fontFamily` section. You can either load these from Google Fonts or any other CDN, and define them in the `index.html` file, or you can host them locally in the `src/assets` folder and define the font family in the `src/styles/fonts.css` file.

### Colors

The template uses mostly default tailwind colors, except the gray is custom. You can tweak these colors to your liking. As for the primary color, this is defined in the tailwind config under the `colors` > `primary` section. I would recommend using one of the [tailwind colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference).

### Sizes

The content sizes are mostly defined by the [Tailwind Typography plugin](https://github.com/tailwindlabs/tailwindcss-typography). You can find these in the `typography` > `DEFAULT` section.

The main content width, gap sizes, etc are defined in the `src/styles/main.css` file.

### Additional styles

Most of the styles are inlined as classes. If you want to modify these en masse, be careful about doing a replace all, as light and dark themes sometimes use the same classes.

Rest of the styles can be found in the `src/styles/` files

## Publish

You can build the site locally with the `npm run build` command and host the files from the `dist/` folder.

Optionally you can use the provided deployment configs for GitHub Pages or Netlify.

### GitHub pages

The project is setup for GitHub pages by default.

But you need to set the correct `base` in `vite.config.js`.

If you are deploying to `https://<USERNAME>.github.io/`, you can omit base as it defaults to `'/'`.

If you are deploying to `https://<USERNAME>.github.io/<REPO>/`, for example your repository is at `https://github.com/<USERNAME>/<REPO>`, then set base to `'/<REPO>/'`.

The project includes a GitHub Build Action in the `.github/workflows/deploy.yml` file. This should be automatically picked up by your repository if you cloned this repo. You can modify the workflow as needed.

### Netlify

Set the `base` in `vite.config.js` to `'/'` or remove it entirely.

Setup up a new project on Netlify from GitHub, the settings should be picked up from the `netlify.toml`. But if they're not the commands should be:

Build Command: `npm run build`
Publish directory: `dist`

### Others

Here are more guides for other platforms: [Vite: Deploying a Static Site](https://vitejs.dev/guide/static-deploy.html)
