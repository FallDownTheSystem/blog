import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import components from 'vite-plugin-components';
import icons from 'unplugin-icons/vite';
import ViteIconsResolver from 'unplugin-icons/resolver';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import markdown from 'vite-plugin-md';
import shiki from 'shiki';
import anchorPlugin from 'markdown-it-anchor';
import taskListsPlugin from 'markdown-it-task-lists';
import { slugify } from './build-time/markdown/slugify';
import { modifyHeading } from './build-time/markdown/heading';
import { linkPlugin } from './build-time/markdown/link';
import { highlightLinePlugin } from './build-time/markdown/highlightLines';
import { lineNumberPlugin } from './build-time/markdown/lineNumbers';
import { containerPlugin } from './build-time/markdown/containers';
import { preWrapperPlugin } from './build-time/markdown/preWrapper';
import metaResolver from './build-time/frontmatter';

export default async ({ command, mode }) => {
	const shikiHighlighter = await shiki.getHighlighter({
		// Choose which syntax highlighting themes you want
		// These are used below in the markdown highlight option
		themes: ['dark-plus', 'github-light']
	});
	/**
	 * @type {import('vite').UserConfig}
	 */
	const userConfig = {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		},
		// Change this depending on your public path, default is '/'
		base: '/blog/',
		// Load scripts async and minify index for for faster initial load
		ssgOptions: {
			script: 'async',
			formatting: 'minify'
		},
		// This is just to disable some warnings, can be safely removed
		server: {
			fs: {
				strict: false
			}
		},
		plugins: [
			vue({
				include: [/\.vue$/, /\.md$/],
				script: {
					refSugar: true
				}
			}),
			VitePWA({
				registerType: 'autoUpdate', // default is 'promp'
				includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
				manifest: {
					name: 'Blog',
					short_name: 'Blog',
					theme_color: '#ffffff',
					icons: [
						{
							src: 'pwa-192x192.png',
							sizes: '192x192',
							type: 'image/png'
						},
						{
							src: 'pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png'
						},
						{
							src: 'pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png',
							purpose: 'any maskable'
						}
					]
				}
			}),
			pages({
				// pagesDir: [{ dir: 'src/pages', baseRoute: '' }],
				extensions: ['vue', 'md'],
				importMode(path) {
					// In case you want some paths to be loaded synchronously
					return 'async';
				},
				extendRoute(route) {
					if (!route.name) {
						route.name = route.path.replace('/', '');
					}

					if (route.component.endsWith('.md')) {
						const meta = metaResolver('.' + route.component);
						route = { ...route, meta: { ...route.meta, ...meta } };
						const keywords = route?.meta?.meta?.find(x => x.name === 'keywords')?.content;
						if (keywords) {
							route.meta.tags = keywords.split(',').map(x => x.trim());
						}
					}
					return route;
				}
			}),
			layouts(),
			components({
				globalComponentsDeclaration: true,
				extensions: ['vue', 'md'],
				customLoaderMatcher: id => id.endsWith('.md'),
				customComponentResolvers: ViteIconsResolver(),
				dirs: ['src/components']
			}),
			icons(),
			markdown({
				wrapperClasses: 'post__layout !mx-auto prose dark:prose-dark',
				wrapperComponent: 'Markdown',
				headEnabled: true,
				markdownItOptions: {
					html: true,
					linkify: true,
					breaks: true,
					lineNumbers: false,
					highlight: (code, lang) => {
						const dark = shikiHighlighter
							.codeToHtml(code, lang || 'text', 'dark-plus')
							.replace('<pre class="shiki"', '<pre class="shiki shiki-dark"');
						const light = shikiHighlighter
							.codeToHtml(code, lang || 'text', 'github-light')
							.replace('<pre class="shiki"', '<pre class="shiki shiki-light"');
						return `${dark}${light}`;
					}
				},
				markdownItSetup(md) {
					md.use(highlightLinePlugin)
						.use(preWrapperPlugin)
						.use(lineNumberPlugin)
						.use(containerPlugin)
						.use(modifyHeading)
						.use(taskListsPlugin)
						.use(
							linkPlugin,
							{
								target: '_blank',
								rel: 'noopener noreferrer'
							},
							'focus:outline-none focus:ring-2 ring-primary-500 rounded'
						)
						.use(anchorPlugin, {
							slugify,
							// This is a pretty bad UX for screen readers apparently, but oh well
							permalink: anchorPlugin.permalink.ariaHidden({
								placement: 'before',
								symbol: '#',
								class:
									'header-anchor w-[1em] opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100 absolute left-[-1em] !font-bold !ring-0',
								space: false
							})
						});
				}
			})
		]
	};
	return userConfig;
};
