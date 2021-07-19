import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import components from 'vite-plugin-components';
import icons, { ViteIconsResolver } from 'vite-plugin-icons';
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import markdown from 'vite-plugin-md';
import anchorPlugin from 'markdown-it-anchor';
import taskListsPlugin from 'markdown-it-task-lists';
import { slugify } from './src/markdown/slugify';
import { highlight } from './src/markdown/highlight';
import { modifyHeading } from './src/markdown/heading';
import { linkPlugin } from './src/markdown/link';
import { highlightLinePlugin } from './src/markdown/highlightLines';
import { lineNumberPlugin } from './src/markdown/lineNumbers';
import { containerPlugin } from './src/markdown/containers';
import { preWrapperPlugin } from './src/markdown/preWrapper';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		vue({
			include: [/\.vue$/, /\.md$/],
			script: {
				refSugar: true
			}
		}),
		pages({
			extensions: ['vue', 'md'],
			importMode(path) {
				return 'async';
			},
			extendRoute(route) {
				if (!route.name) {
					return {
						...route,
						name: route.path.replace('/', '')
					};
				}
				return route;
			}
		}),
		layouts(),
		markdown({
			wrapperClasses: 'post__layout !mx-auto prose',
			wrapperComponent: 'Markdown',
			headEnabled: true,
			markdownItOptions: {
				html: true,
				linkify: true,
				breaks: true,
				lineNumbers: false,
				highlight
			},
			markdownItSetup(md) {
				md.use(highlightLinePlugin)
					.use(preWrapperPlugin)
					.use(lineNumberPlugin)
					.use(containerPlugin)
					.use(modifyHeading)
					.use(taskListsPlugin)
					.use(linkPlugin, {
						target: '_blank',
						rel: 'noopener noreferrer'
					})
					.use(anchorPlugin, {
						slugify,
						permalink: true,
						permalinkBefore: true,
						permalinkSymbol: '#',
						permalinkClass: 'header-anchor w-[1em] opacity-0 hover:opacity-100 group-hover:opacity-100 absolute left-[-1em]',
						permalinkAttrs: () => ({ 'aria-hidden': true })
					});
			}
		}),
		components({
			extensions: ['vue', 'md'],
			customLoaderMatcher: id => id.endsWith('.md'),
			customComponentResolvers: ViteIconsResolver(),
			dirs: ['src/components']
		}),
		icons()
	]
});
