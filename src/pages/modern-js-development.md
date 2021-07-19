---
title: Modern JS - Modern JS Development
---

<route>
{
	meta: {
		title: "Modern JavaScript Development",
		description: "An overview of the JavaScript ecosystem and the tools used to create modern JavaScript applications.",
		order: 40,
	}
}
</route>

<Title :title="$route.meta.title" :description="$route.meta.description" />

In the previous articles, we've mostly focused on the JavaScript language. In this and the following article, we'll instead focus on the development of JavaScript applications using modern tools and libraries. This article aims to introduce you to the different concepts and tools used to build modern JavaScript applications — we could call this the JavaScript ecosystem.

> What exactly is the JavaScript ecosystem?

That's not an easy question to answer. The short answer is that it's the tools and libraries used to build JavaScript applications. It's also the development tools we use. To some extent, it's even the services we use — things like databases, authentication, deployment, hosting, etc. Everything's connected.

We're going to touch all of that, but more specifically, the topics I'm going to talk about are:

- Runtime environments
- Package management
- Module systems
- Bundlers
- Transpilers
- Web applications
- The *Jamstack*
- and other development tools

In the following chapters, I want to introduce you to many of the common-day tools and libraries used in JavaScript development so that you'll recognize the names and be able to understand what's going on when you encounter them in the future.

But, before we try to understand the *status quo*, I think it'll be helpful to look at how we got here.

## The transition to build tools

I want to quickly explain how JavaScript development transitioned to using build tools. It's not obvious why we would need build tools for JavaScript. After all, JavaScript was made for the web. You inline some JavaScript in a `<script>` tag within your HTML document or specify a `src` attribute on the script tag that points to a JavaScript file. That's it. The browser runs the code as soon as it's encountered; no compilation is required.

> What if we want to use libraries?

Well, we could download someone else's JavaScript file and load it with a `<script>` tag all the same. But admittedly, this is kind of a tedious process, especially if we have many libraries.

Other languages deal with this by having package managers — usually a command-line tool that can download and update packages (libraries). Python has pip, Java has Maven or Gradle, C# has NuGet, Rust has Cargo, and so and so forth.

But then again, these other languages have something that JavaScript traditionally didn't; support for **modules**. Modules allow you to import and export code from another file.

> So, what changed?

[Node.js](https://nodejs.org/en/), a JavaScript runtime built on Chrome's V8 JavaScript engine, meant that you can run JavaScript without a browser, just like any other language.

Along with Node.js came **npm**, the Node Package Manager. It didn't take long for npm to have tens of thousands of packages and now well over a million packages. But these packages were initially made for Node.js, not for the browser. Still, many of the libraries could be used in either environment.

::: c note Note
We'll talk more in-depth about these concepts and others in the following chapters, so don't be alarmed if you still don't know what any of these things are.
:::

> Now we have a package manager in JavaScript, problem solved, right?

Well, not really. We still have two problems.

- Some libraries can't be used in the browser because they use the node module system (CommonJS), which isn't valid JavaScript syntax in the browser.
- It's still tedious to get the library's code from the `node_modules` folder, where all the NPM packages are installed.

Introducing: **Bundlers**.

> [Browserify](https://browserify.org/) lets you `require('modules')` in the browser by bundling up all of your dependencies.

The idea is simple enough. You resolve all the imports and bundle them into a single file. Now you can use NPM packages in the browser (assuming they're otherwise browser compatible).

Now we have package management, and we can take advantage of the large library of packages already made for Node.js. We can easily update our dependencies and bundle them into a single file for our web page. But that does mean we have a build step. We need tools to develop our applications now. So, in for a penny, in for a pound.


## JavaScript runtimes

We mentioned Node.js, a JavaScript runtime, so let's take a step back and try to understand JavaScript runtimes.

:::: c info "What is a runtime environment?"

Most programming languages have some form of runtime system that provides an environment in which programs run.

::: c tag more

This environment may address a number of issues including the management of application memory, how the program accesses variables, mechanisms for passing parameters between procedures, interfacing with the operating system, and otherwise.

The compiler makes assumptions depending on the specific runtime system to generate correct code. Typically the runtime system will have some responsibility for setting up and managing the stack and heap, and may include features such as garbage collection, threads or other dynamic features built into the language.
:::
[Runtime system](https://en.wikipedia.org/wiki/Runtime_system)
::::

Here's how Node.js is introduced on their website:

> As an asynchronous event-driven JavaScript runtime, [Node.js](https://nodejs.org/en/about/) is designed to build scalable network applications. HTTP is a first-class citizen in Node.js, designed with streaming and low latency in mind. This makes Node.js well suited for the foundation of a web library or framework.

So basically, we can use JavaScript to write programs like other languages. But the feature set of Node.js makes it exceptionally suitable for server-side development or anything that deals with the web.

JavaScript is **the** language for the web, so it makes sense that it would also be used on the server-side of the equation. And that's exactly what Node is used commonly used for.

There are a lot of different web frameworks for Node.js. The most popular of them being [Express](https://expressjs.com/), but there are others like [Koa](https://koajs.com/), [Hapi](https://hapi.dev/), [Fastify](https://www.fastify.io/), and [NestJS](https://nestjs.com/).

Node isn't only used for web servers. Its asynchronous and event-based nature means that it's a pretty good solution for any real-time application, especially those dealing with the web since HTTP is a first-class citizen.

Node.js isn't the only game in town. [Deno](https://deno.land/) (Node backward) was created by the original developer of Node.js, Ryan Dahl.

> Deno is a simple, modern, and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.
> - Secure by default. No file, network, or environment access, unless explicitly enabled.
> - Supports TypeScript out of the box.
> - Ships only a single executable file.
> - Has built-in utilities like a dependency inspector (`deno info`) and a code formatter (`deno fmt`).
> - Has a set of reviewed (audited) standard modules that are guaranteed to work with Deno: [deno.land/std](https://deno.land/std)

Deno tries to solve some of the problems of Node.js, namely security and how it handles dependencies. Node's popularity still trumps Deno's, but that said, Deno isn't necessarily trying to compete with Node — rather provide an alternative. Deno might be a better environment for utility scripts, more akin to Bash or Python.

## Package management

Let's talk about npm and some alternatives. First, what exactly is npm?

npm consists of three distinct components:

- The [website](https://www.npmjs.com/)
- The [CLI](https://docs.npmjs.com/cli/v7)
- The [registry](https://docs.npmjs.com/cli/v7/using-npm/registry)

We're only really interested in the CLI.

The two most important features of the `npm` CLI are firstly to function as a package manager, i.e., to literally install, update and publish packages. And secondly, to be a task runner, meaning running scripts or executables, usually from a package you've installed.

A project will have a `package.json` at its root, which will define the dependencies you're using and potentially scripts/tasks you use for your project. The `package.json` file will look slightly different if you're creating a library, rather than just consuming packages.

The default `package.json` looks like this:

```json
{
	"name": "my_package",
	"description": "",
	"version": "1.0.0",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"repository": {
		"type": "git",
		"url": "https://github.com/monatheoctocat/my_package.git"
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"bugs": {
		"url": "https://github.com/monatheoctocat/my_package/issues"
	},
	"homepage": "https://github.com/monatheoctocat/my_package"
}
```

But a more typical `package.json` for a project that only consumes packages might look more like this:

```json
{
	"name": "project-name",
	"version": "1.0.0",
	"scripts": {
		"dev": "vite",
		"build": "vite build",
		"serve": "vite preview"
	},
	"dependencies": {
		"vue": "^3.0.11",
		"vue-router": "^4.0.8"
	},
	"devDependencies": {
		"eslint": "^7.27.0",
		"vite": "^2.3.4",
	}
}
```

npm didn't always have a task runner built-in, so other tools existed (still do) to do that job, but these other tools have largely fallen out of favor.

A few names you may still come across are:

- [Grunt](https://gruntjs.com/): A task runner.
- [Gulp](https://gulpjs.com/): A toolkit to automate & enhance your workflow.
- [Bower](https://bower.io/): A package manager for the web.

But, as said, these have been replaced by built-in features in `npm` and by other tools like webpack and Rollup (which we will talk about soon in the [Bundlers](#bundlers) section).

Even though some of these tools are deprecated or on their way to be, npm still has competition. There are other package managers that use the npm registry, but offer additional features and altering implementations.

- [Yarn](https://yarnpkg.com/): A package manager that doubles down as project manager.
- [pnpm](https://pnpm.io/): Fast, disk space-efficient package manager.

Their feature sets are very close nowadays, as npm implemented most of the features that originated in Yarn. pnpm is the newest of the bunch and is focused on performance.

::: c note Note
Before you go crazy adding packages to your next project, check out a site called [Bundlephobia](https://bundlephobia.com/), where you can look up the size of a package. It's always a good idea to be informed about the impact of adding a dependency to your project.
:::

## Module systems

There's one feature we skipped in the [New ECMAScript Features](/new-es-features) article: Importing and exporting, i.e., modules. Before ES modules were introduced to the language, we couldn't import or export code in the browser. But as we saw, we can in Node.js, and we can take advantage of modules created for Node.js with bundlers.

::: c info Info
If you're interested in ES modules, the official, standardized module system in JavaScript, and how to import/export modules, check out: [MDN: Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and [MDN: Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).
:::

We already mentioned one module format, CommonJS. Note that I called CommonJS a *format*, because it's a definition. There are multiple different module definitions for JavaScript that are implemented by various module **loaders**. Some module loaders are built into tools like bundlers, some are stand-alone libraries.

The most notable module formats are
- CommonJS (`cjs/commonjs`): The original module format used in Node.js.
- Asynchronous Module Definition (`amd`): Based on CJS, but with support for asynchronous module loading.
- Universal Module Definition (`umd`): A universal format that's compatible with AMD and CJS.
- ES Modules (`esm/module`): JavaScript's native module format, also supported by Node.js.
- SystemJS modules (`system`): The native format for the Universal module loader (SystemJS) that supports CJS, AMD, and ESM.

Out of all of these, you really only need to recognize the CommonJS and ES modules syntax.

CommonJS uses the `require` keyword and a global `exports` object.

```js
// Requiring a module (npm package)
const package = require('module-name')
// or a local file
const circle = require('./circle.js');
// Using the imported module
console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);

// Exporting individual values
// these can be anything, primitives, objects, functions, classes, etc.
module.exports.someValue = "Hello world!";
module.exports.anotherValue = [1, 2, 3];
// Can also use the shortcut
exports.someValue = "Hello world!";

// You can also assign an object directly
module.exports = { prop1: "Hello", anotherProp: "World" }
```

[Node.js CommonJS modules](https://nodejs.org/docs/latest/api/modules.html)

ES Modules, on the other hand, use the `import` and `export` syntax.

```js
import defaultExport from "module-name";
import { export1, export2 } from "module-name";

export function functionName(){...}
export const variable1;
export { name1, name2, …, nameN };

// Default exports
export default expression;
```
[MDN: Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [Export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

## Bundlers

We covered the basic idea of bundlers, but they can do so much more than just combine your modules into a single file. [Browserify](https://browserify.org/) really tries to solve the issue of using Node.js modules in the browser, but not much more beyond that.

Newer bundlers like webpack and Rollup can do a lot more via loaders or plugins. Let's use [webpack](https://webpack.js.org/) as an example of how a bundler typically works.

> At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph that maps every module your project needs and generates one or more bundles.

You use a configuration file to define how webpack should work. The key concepts are:
- Entry points
- Output (bundles)
- Loaders & Plugins

Let's start with entry points.

> An entry point indicates which module webpack should use to begin building out its internal dependency graph. webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).

You can define one or multiple entry points.

Output is exactly what it sounds like.

> The output property tells webpack where to emit the bundles it creates and how to name these files.

Loaders and plugins are similar concepts.

> Out of the box, webpack only understands JavaScript and JSON files. **Loaders** allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.

> While loaders are used to transform certain types of modules, **plugins** can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

Simply put, loaders and plugins let you extend the functionality of webpack to support other file formats and to perform other tasks than just bundling.

A webpack config might look something like this:

```js
//installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './path/to/my/entry/file.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'my-first-webpack.bundle.js',
	},
	// The module property defines rules for which file types it transforms
	// and a loader to use for those files
	module: {
		rules: [{ test: /\.txt$/, use: 'raw-loader' }],
	},
	// the html-webpack-plugin generates an HTML file for your application
	// by automatically injecting all your generated bundles
	plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```

[Webpack concepts](https://webpack.js.org/concepts/)

[Rollup](https://rollupjs.org/guide/en/) is very similar to webpack, except by default it only supports the ES module syntax.

> Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. It uses the new standardized format for code modules included in the ES6 revision of JavaScript, instead of previous idiosyncratic solutions such as CommonJS and AMD.

But Rollup can support the CommonJS format via a plugin.

The other difference is that Rollup doesn't make a distinction between loaders and plugins. In Rollup, everything is a plugin.

Rollup also provides *tree-shaking* out of the box.

> Rollup statically analyzes the code you are importing, and will exclude anything that isn't actually used. This allows you to build on top of existing tools and modules without adding extra dependencies or bloating the size of your project.

You can also enable tree-shaking in webpack, but it requires you to define which files are safe to tree-shake, since the CommonJS format of imports cannot be statically analyzed the same way as ES modules.

Other bundlers also exist, like [Parcel](https://v2.parceljs.org/).

> Parcel supports many different languages and file types out of the box, from web technologies like HTML, CSS, and JavaScript, to assets like images, fonts, videos, and more.

Because Parcel requires zero or minimal configuration — and supports the most common file types and frameworks out of the box, it's easy to get started with.

There are also other tools, like [Snowpack](https://www.snowpack.dev/) and [Vite](https://vitejs.dev/) that can be classified as frontend build tools.

They're not exactly bundlers, but they do offer bundling for production as one of their features. Other features include:

- Taking advantage of the ES module format to enable development without bundling making the developer experience very fast
- Hot Module Replacement (HMR), i.e., loading changes made during development without refreshing the page/app.
- Support the most common asset types out of the box.

One more bundler worth mentioning is [esbuild](https://esbuild.github.io/). Bundlers are generally speaking fairly slow, mainly because they're all written in JavaScript. That's where esbuild is different, as it's made with [Go](https://golang.org/), and it's 10-100 times faster than other mainstream bundlers.

If esbuild is so fast, why not bundle everything with esbuild?

Vite answers this question perfectly:

> While esbuild is blazing fast and is already a very capable bundler for libraries, some of the important features needed for bundling applications are still work in progress - in particular code-splitting and CSS handling. For the time being, Rollup is more mature and flexible in these regards. That said, we won't rule out the possibility of using esbuild for production build when it stabilizes these features in the future.

## Transpilers and preprocessors

Now we know the basic principles of bundlers and that that we can extend the functionality of bundlers with plugins, but we haven't really talked about what kinds of plugins we could use.

One use-case would be importing assets we typically couldn't — for example, SVG, JSON, or Markdown files.

Another one is to use plugins that enable transpilation, meaning we can use another language and *transform* it back into a language the web understands. We can use bundler plugins to use preprocessors and transpilers for our code, not just for JavaScript but for any language we use, including CSS and HTML.

Let's look at the most common preprocessors and transpilers. Note that these tools typically exist as stand-alone but usually have plugins/loaders for bundlers. All of these tools have a common theme. They enable new features and new ways of writing the languages we use for the web while ultimately transforming the code we write back into plain JavaScript, CSS, or HTML.

For HTML we can use templating languages like [Pug](https://pugjs.org/api/getting-started.html) or [lit-html](https://lit.dev/). These generally allow us to embed JavaScript expressions into our HTML, and/or they have a syntax that's less verbose than the XML syntax of HTML.

For CSS we can use preprocessors like [SASS](https://sass-lang.com/), [LESS](https://lesscss.org/), or [PostCSS](https://postcss.org/). CSS preprocessors generally enable features like variables, nesting, modules, etc.

For JavaScript we can use transpilers like [Babel](https://babeljs.io/), or [TypeScript](https://www.typescriptlang.org/). Babel is especially common, as it lets us write JavaScript with modern features without having to worry about browser compatibility issues.

TypeScript has also taken the JavaScript world by storm.

> TypeScript builds on JavaScript by adding static type definitions. Types provide a way to describe the shape of an object, providing better documentation, and allowing TypeScript to validate that your code is working correctly.

TypeScript is a superset of JavaScript, which means that all valid JavaScript code is also TypeScript code. Most popular frameworks support TypeScript; TypeScript is actually the primary language for Angular.

We can also use plugins transform framework-specific formats, like [React](https://reactjs.org/)'s [JSX](https://reactjs.org/docs/introducing-jsx.html) or [Vue](https://v3.vuejs.org/)'s [SFC](https://v3.vuejs.org/guide/single-file-component.html#single-file-components) to JavaScript.

## Web applications

With these new tools at our disposal, web development is starting to look a lot more like traditional software development. We're no longer just creating static web pages; we're *building* web **applications**.

This is a trend that's been ongoing since the days when AJAX was first introduced. With AJAX, content is loaded dynamically. We can take this concept even further, where entire pages are loaded dynamically. This idea is called a [single-page application (SPA)](https://developer.mozilla.org/en-US/docs/Glossary/SPA).

### Single-page applications

A SPA is a web app implementation that loads only a single page, and subsequent pages are loaded dynamically. This means that the "routing" is handled by JavaScript. This more dynamic experience enables faster transitions that make the website feel more like a native app.

Since SPAs run entirely on the client-side, they're typically used in a serverless environment. The web app is served as static files, and all server-side operations are handled by microservices. We'll talk about this kind of architecture in the chapter about [the Jamstack](#the-jamstack).

SPAs are generally build using frontend frameworks like [React](https://reactjs.org/), [Angular](https://angular.io/), or [Vue](https://v3.vuejs.org).

### Search Engine Optimization (SEO)

One of the major downsides of SPAs is that routing is handled by JavaScript, which makes it harder for search engines to crawl the website.

One strategy to improve SEO is to pre-render the pages (in Node.js, for example) and generate static HTML pages with all the content. This way, crawlers can see all the static content. The downside of this strategy is that you're creating a double payload, the SPA, and the pre-rendered static pages.

### Progressive Web Apps

A SPA is still a web page; they're opened and viewed in the browser like any other page. There's another design pattern — a set of tools that allows us to create more native-like experiences with web apps.

[Progressive Web Apps (PWAs)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) are web apps that use emerging web browser APIs and features along with traditional progressive enhancement strategy to bring a native app-like user experience to cross-platform web applications.

PWAs allow us to "install" web pages as if they were real applications, both on mobile and desktop environments. The idea is that we define a manifest JSON file that allows us to configure how our app appears to the user and ensures that the web app is installable. The manifest file describes the app's name, the start URL, icons, and all of the other details necessary to transform the website into an app-like format.

We can also use service workers to make a cached version of our web application work even when the user's device is offline. Other new browser-APIs also help us create more native-like experiences, including access to device sensors and notification APIs.

[web.dev: Progressive Web Apps](https://web.dev/progressive-web-apps/)

## The Jamstack

Earlier, we alluded to the ***Jamstack***, so what exactly is the Jamstack?

You may have heard of the MERN or MEAN stack, which stood for [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://reactjs.org/), and [Node](https://nodejs.org/en/). This is a technology stack based entirely on JavaScript. MEAN is the same stack, just React replaced with [Angular](https://angular.io/). Jamstack, on the other hand, doesn't advocate for any specific technology; instead, Jamstack stands for JavaScript, APIs, and Markup.

The core principles of the Jamstack are to
- Create static pages — preferably through pre-rendering at the build phase
- Decouple the markup from the APIs by utilizing services rather than a server-based solution.

There are many platform-as-a-service providers that make it easy to deploy and host modern web apps, for example [Netlify](https://www.netlify.com/) and [Vercel](https://vercel.com/).

It should be noted that this isn't the only architecture for JavaScript applications, nor is it the best one for every scenario. It's just one that enables fast development and deployment.

If you're interested in learning more about the why and how of Jamstack, check out:

[Netlify: Jamstack](https://www.netlify.com/jamstack/)
[Jamstack.org: What is Jamstack](https://jamstack.org/what-is-jamstack/)

## Other development tools

Build tools aren't the only area where JavaScript application development has advanced. Let's take a quick look at two more areas where JavaScript has become comparable to other languages.

### Testing frameworks

Practically every language has some kind of support for testing frameworks, and JavaScript is no different. There are unit testing frameworks like [Jest](https://jestjs.io/), [Mocha](https://mochajs.org/), or [Jasmine](https://jasmine.github.io/).

There are also End-to-End (E2E) testing frameworks, like [Cypress](https://www.cypress.io/), and API mocking libraries like [Mirage](https://miragejs.com/) or [Mock Service Worker](https://mswjs.io/).

### IDE Integrations

The most popular IDEs for JavaScript development, such as [Microsoft's Visual Studio Code](https://code.visualstudio.com/) [JetBrain's WebStorm](https://www.jetbrains.com/webstorm/), have built-in support or support plugins for linting, formatting, language services, and debugging. Projects can also include linting and formatting tools as development dependencies.

The most popular linter for JavaScript is [ESLint](https://eslint.org/).

> ESLint statically analyzes your code to quickly find problems. ESLint is built into most text editors, and you can run ESLint as part of your continuous integration pipeline.

The most popular formatter is [Prettier](https://prettier.io/), an opinionated code formatter that supports many languages.

If we put all of this together, it's plain to see how much JavaScript development has changed since the days of writing a little bit of code inlined in your HTML file to enable small dynamic features. For better or worse, we have everything you'd expect from a "real" programming language:

- Modules and package management
- Compilation (transpilation) and build tools
- Support for building native-like experiences
- Frontend and testing frameworks
- IDE support with language services, linting, and formatting
- Even debugging

In a workflow like this, you'd be hard-pressed to find a difference between a compiled language and JavaScript.
