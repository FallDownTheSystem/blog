import { ViteSSG } from 'vite-ssg';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import NProgress from 'nprogress';
import App from './App.vue';
import './styles/main.css';

const routes = setupLayouts(generatedRoutes);

export const createApp = ViteSSG(
	// the root component
	App,
	// vue-router options
	{
		base: import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL,
		routes,
		scrollBehavior(to, from, savedPosition) {
			if (savedPosition) {
				return savedPosition;
			} else if (to.hash) {
				return { el: to.hash };
			} else {
				return { left: 0, top: 0 };
			}
		}
	},
	// function to have custom setups
	({ app, router, routes, isClient, initialState }) => {
		// Install plugins etc.
		// Router and vueHead are handled by ViteSSG
		if (isClient) {
			// Register PWA
			router.isReady().then(async () => {
				const { registerSW } = await import('virtual:pwa-register');
				registerSW({ immediate: true });
			});

			// NProgress
			NProgress.configure({ trickleSpeed: 100, showSpinner: false });
			router.beforeEach((to, from) => {
				if (to.path !== from.path) {
					NProgress.start();
				}
			});
			router.afterEach(() => {
				NProgress.done();
			});
		}
	}
);
