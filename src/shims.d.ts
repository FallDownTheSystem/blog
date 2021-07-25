/* eslint-disable import/no-duplicates */

declare interface Window {
	// extend the window
}

// With vite-plugin-md, markdown files can be treat as Vue components
declare module '*.md' {
	import { ComponentOptions } from 'vue';
	const component: ComponentOptions;
	export default component;
}
