<template>
	<div class="flex p-8 max-w-[var(--column)] space-x-8 mx-auto">
		<router-link
			class="
				group
				flex flex-col flex-1
				items-center
				mr-auto
				px-4
				py-2
				space-y-2
				rounded
				focus:ring-2
				ring-primary-500 ring-offset-4 ring-offset-white
				dark:ring-offset-gray-900
				hover:bg-gray-100
				dark:hover:bg-gray-800
				focus:outline-none focus:bg-gray-100
				dark:focus:bg-gray-800
				text-gray-600
				dark:text-gray-100
				hover:text-gray-700
				dark:hover:text-gray-50
			"
			aria-label="Previous article"
			v-if="articleNav?.prev"
			:to="articleNav?.prev?.path"
		>
			<LeftArrow
				class="
					w-7
					h-7
					group-hover:text-gray-700
					group-focus:text-gray-700
					text-gray-500
					dark:group-hover:text-gray-300 dark:group-focus:text-gray-300 dark:text-gray-600
				"
			/>
			<span class="text-center">{{ articleNav?.prev?.meta?.name ?? articleNav?.prev?.meta?.title }}</span>
		</router-link>
		<router-link
			aria-label="Next article"
			v-if="articleNav?.next"
			:to="articleNav?.next?.path"
			class="
				group
				flex flex-col flex-1
				items-center
				mr-auto
				px-4
				py-2
				space-y-1
				rounded
				focus:ring-2
				ring-primary-500 ring-offset-4 ring-offset-white
				dark:ring-offset-gray-900
				hover:bg-gray-100
				dark:hover:bg-gray-800
				focus:outline-none focus:bg-gray-100
				dark:focus:bg-gray-800
				text-gray-600
				dark:text-gray-100
				hover:text-gray-700
				dark:hover:text-gray-50
			"
		>
			<RightArrow
				class="
					w-7
					h-7
					group-hover:text-gray-700
					group-focus:text-gray-700
					text-gray-500
					dark:group-hover:text-gray-300 dark:group-focus:text-gray-300 dark:text-gray-600
				"
			/>
			<span class="text-center">{{ articleNav?.next?.meta?.name ?? articleNav?.next?.meta?.title }}</span>
		</router-link>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import sortBy from 'lodash/sortBy';
import store from '../../store';
/** @type {{ hash: string, type: string, pos: number, title: string }[]} */
const articleNav = ref({ prev: null, next: null });

const router = useRouter();
const route = useRoute();

watch(
	() => store.mounted,
	(prev, next) => {
		const currentRoute = route.matched.find(x => x.path !== '/');
		const articles = sortBy(
			router.getRoutes().filter(x => x.path !== '/' && x.name !== 'all' && x.name),
			'meta.date'
		).reverse();
		if (articles && currentRoute) {
			const index = articles.findIndex(x => x.path == currentRoute.path);
			articleNav.value.next = index < articles.length - 1 ? articles[index + 1] : null;
			articleNav.value.prev = index > 0 ? articles[index - 1] : null;
		}
	}
);
</script>
